import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoudary from "../errorBoudary/ErrorBoudary";
import decoration from '../../resources/img/vision.png';
import FindChar from '../findChar/FindChar';



const MainPage = () => {

    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id);
    }

    return (
        <>
            <ErrorBoudary>
                <RandomChar />
            </ErrorBoudary>
            <div className="char__content">
                <ErrorBoudary>
                    <CharList onCharSelected={onCharSelected} />
                </ErrorBoudary>
                <div>
                    <ErrorBoudary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoudary>
                    <ErrorBoudary>
                        <FindChar />
                    </ErrorBoudary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}


export default MainPage;