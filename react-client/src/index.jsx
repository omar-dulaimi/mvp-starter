import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Favs from './components/Favs.jsx';
import QuoteImage from './components/QuoteImage.jsx';
import List from './components/List.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: [],
            favquotes: [],
            showFavs: false,
            showImage: false,
        };
    }

    componentDidMount() {
        this.generateQuote();
    }

    generateQuote() {
        if (this.state.showFavs) {
            this.setState({ showFavs: false });
        }
        this.setState({ showImage: true });

        axios
            .get('/items')
            .then((quote) => {
                this.setState({
                    quote: quote.data,
                });
            })
            .catch((err) => {
                console.log({
                    msg: 'Failure: could not generate quote!',
                    error: err,
                });
            });
    }

    addToFavoriteQuotes() {
        const { quote } = this.state;
        axios
            .post('/favquotes', quote)
            .then((res) => {})
            .catch((err) => {
                console.log({
                    msg: 'Failure: could not send quote!',
                    error: err,
                });
            });
    }

    retrieveFavorites() {
        const { showImage, showFavs } = this.state;
        axios
            .get('/favquotes')
            .then((favquotes) => {
                this.setState({
                    favquotes: favquotes.data,
                });

                if (showImage) {
                    this.setState({ showImage: false });
                }
                this.setState({ showFavs: !showFavs });
            })
            .catch((err) => {
                console.log({
                    msg: 'Failure: could not get favorites!',
                    error: err,
                });
            });
    }

    render() {
        return (
            <div className="container h-100">
                <div className="row h-100 justify-content-center align-items-center contentainer">
                    <div className="col-md-12">
                        <h1 className="title">Quotes Machine</h1>
                    </div>
                    <div className="col-md-12">
                        <List quote={this.state.quote} />
                    </div>
                    <div className="col-md-8 text-center">
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={this.generateQuote.bind(this)}
                        >
                            Generate
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.addToFavoriteQuotes.bind(this)}
                        >
                            Like
                        </button>
                        <button
                            type="button"
                            className="btn btn-info"
                            onClick={this.retrieveFavorites.bind(this)}
                        >
                            Favorites
                        </button>
                    </div>
                </div>
                <div className="row h-80 justify-content-center align-items-center contentainerfavs">
                    {this.state.showFavs ? (
                        <Favs favquotes={this.state.favquotes} />
                    ) : null}
                    {this.state.showImage ? (
                        <QuoteImage quoteImg={this.state.quote.imageUrl} />
                    ) : null}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
