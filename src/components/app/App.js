
import { Component } from "react/cjs/react.production.min";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoudary from "../errorBoudary/ErrorBoudary";
import decoration from '../../resources/img/vision.png';

class App extends Component {

    state = {
        selectedChar: null,
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id,
        })
    }

    render() {
        return (
            <div className="container">
                <div className="app">
                    <AppHeader />
                    <main>
                        <ErrorBoudary>
                            <RandomChar />
                        </ErrorBoudary>
                        <div className="char__content">
                            <ErrorBoudary>
                                <CharList onCharSelected={this.onCharSelected} />
                            </ErrorBoudary>
                            <ErrorBoudary>
                                <CharInfo charId={this.state.selectedChar} />
                            </ErrorBoudary>
                        </div>
                        <img className="bg-decoration" src={decoration} alt="vision" />
                    </main>
                </div>
            </div>
        )
    }
}

export default App;