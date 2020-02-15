import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Favs from './components/Favs/Favs.jsx';
import QuoteImage from './components/Quotes/QuoteImage/QuoteImage.jsx';
import Quotes from './components/Quotes/Quotes.jsx';
const getBaseUrl = require('../../getBaseUrl.js');
axios.interceptors.request.use(
  async (config) => {
    config.baseURL = getBaseUrl();
    return config;
  },
  (error) => Promise.reject(error)
);
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
      .get('/api/v1/quotes/generate')
      .then((res) => {
        this.setState({
          quote: res.data,
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
      .post('/api/v1/quotes', quote)
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
      .get('/api/v1/quotes')
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
            <Quotes quote={this.state.quote} />
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
        <div className="row h-80 justify-content-center align-items-center favs">
          {this.state.showFavs ? (
            <Favs favquotes={this.state.favquotes} />
          ) : null}
          {this.state.showImage ? (
            <QuoteImage quoteImg={this.state.quote.authorImage} />
          ) : null}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
