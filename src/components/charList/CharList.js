import { React, useState, useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types';

import './charList.scss';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';


const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(true);
    const [offset, setOffset] = useState(240);
    const [charEnded, setCharEnded] = useState(false);
    const [isEnd, setIsEnd] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (newItemLoading && !isEnd) {
            onRequest();
        }
    }, [newItemLoading])

    const onScroll = (event) => {
        if ( window.innerHeight + window.pageYOffset >= document.body.offsetHeight ) {
            setNewItemLoading(true);
        }
    };

    const onRequest = () => {
        onCharactersLoading();
        marvelService.getAllCharacters(offset)
            .then(onCharactersLoaded)
            .catch(onError)
            .finally(() => setNewItemLoading(false));
    };


    const onCharactersLoading = () => {
        setNewItemLoading(true);
    };

    const onCharactersLoaded = (newCharList) => {
        setCharList((charList) => [...charList, ...newCharList]);
        setLoading(false);
        setError(false);
        setOffset((offset) => offset + 9);
        setIsEnd(newCharList.length < 9 ? true : false);
    };

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    } 
    function renderItems(arr) {
        const items = arr.map((item, index) => {
            let imgStyle = {
                'objectFit': 'cover'
            };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {
                    'objectFit': 'unset'
                };
            } 
            return ( 
                <li className={`char__item`}
                    ref={el => itemRefs.current[index] = el}
                    key={item.id}
                    tabIndex={index}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(index);
                    }}
                    onKeyPress={(e) => {
                        e.preventDefault();
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            focusOnItem(index);
                        }
                    }} >

                    <img src={item.thumbnail}
                        alt={item.name}
                        style={imgStyle} />
                    <div className="char__name" > {item.name}
                    </div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid" > {items} </ul>
        )
    } 
    const items = renderItems(charList);
    const errorMessage = error ? < ErrorMessage /> : null;
    const spinner = loading ? < Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="char__list" >
            {errorMessage}
            {spinner}
            {content}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner" > load more </div>
            </button>
        </div>
    ) 
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
} 

export default CharList;