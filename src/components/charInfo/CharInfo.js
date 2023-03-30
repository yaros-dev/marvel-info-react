import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';


const CharInfo = (props) => {

    const [charInfo, setCharInfo] = useState(null);
    const [show, setShow] = useState(false);
    const { loading, error, getCharacter, clearError, process, setProcess } = useMarvelService();


    useEffect(() => {
        updateCharInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.charId])


    const updateCharInfo = () => {
        const { charId } = props;
        if (!charId) {
            return;
        }


        clearError();
        setShow(false);
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))

    }

    const onCharLoaded = (charInfo) => {
        setCharInfo(charInfo);
        setShow(true);
    }

    const setContent = (process, charInfo) => {
        switch (process) {
            case 'waiting':
                return <Skeleton />;
                break;
            case 'loading':
                return <Spinner />;
                break;
            case 'confirmed':
                return <View char={charInfo} />;
                break;
            case 'error':
                return <ErrorMessage />;
                break;
            default:
                throw new Error('Unexpected process state')
                break;
        }
    }


    // const skeleton = charInfo || loading || error ? null : <Skeleton />;
    // const errorMessage = error ? <ErrorMessage /> : null;
    // const spinner = loading ? <Spinner /> : null;
    // const content = !(loading || error || !charInfo) ? <View char={charInfo} /> : null

    return (

        <div className="char__info">
            {setContent(process, charInfo)}
        </div>

    )

}

const View = ({ char }) => {

    const { name, description, thumbnail, homepage, wiki, comics } = char;

    let imgStyle = { 'objectFit': 'cover' };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'unset' };
    }

    return (
        <>

            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
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
            {comics.length > 0 ? null : 'There is no comics with this character'}

            <ul className="char__comics-list">
                {

                    comics.map((item, i) => {

                        // eslint-disable-next-line
                        if (i > 9) return;
                        return (

                            <li key={i} className="char__comics-item" >
                                {item.name}
                            </li>

                        )
                    }
                    )

                }

            </ul>

        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}
export default CharInfo;