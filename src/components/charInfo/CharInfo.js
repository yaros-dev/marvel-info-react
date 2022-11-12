import { Component } from 'react/cjs/react.development';
import './charInfo.scss';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';

class CharInfo extends Component {

    state = {
        charInfo: {},
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharInfo();
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onCharLoaded = (charInfo) => {
        this.setState({
            charInfo,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateCharInfo = () => {
        const { charId } = this.props;
        if (!charId) {
            return;
        }
        this.onCharLoading();
        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {
        const { charInfo, loading, error } = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View char={charInfo} /> : null

        return (
            <div className="char__info">
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;
    const isImgChar = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? true : false;
    const classNamesImgChar = `randomchar__img ${isImgChar && 'randomchar__not-img'} `;

    getComics = (items) => {
        const res = items.map((item) => {
            return (
                <li className="char__comics-item">
                    {item.name}
                </li>
            )
        });

        return (
            <ul className="char__comics-list">
                {res}
            </ul>
        )
    }

    return ( 
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" className={classNamesImgChar} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description} </div>
            <div className="char__comics">Comics:</div>
            { }
            <div/>
        </>
    )
}
export default CharInfo;