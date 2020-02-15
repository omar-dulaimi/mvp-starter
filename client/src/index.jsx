import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './components/Favs/Favs.css';
import './components/Quotes/QuoteImage/QuoteImage.css';
import './components/Quotes/QuoteItem/QuoteItem.css';
import './components/ProgressSpinner/ProgressSpinner.css';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Favs from './components/Favs/Favs.jsx';
import QuoteImage from './components/Quotes/QuoteImage/QuoteImage.jsx';
import Quotes from './components/Quotes/Quotes.jsx';
import ProgressSpinner from './components/ProgressSpinner/ProgressSpinner.jsx';
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
      loading: false,
    };
  }

  componentDidMount() {
    this.generateQuote();
  }

  generateQuote() {
    if (this.state.showFavs) {
      this.setState({ showFavs: false });
    }
    this.setState({ showImage: true, loading: true });

    axios
      .get('/api/v1/quotes/generate')
      .then((res) => {
        this.setState({
          quote: res.data,
          loading: false,
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
    this.setState({ loading: true });
    axios
      .post('/api/v1/quotes', quote)
      .then((res) => {
        this.setState({ loading: false });
      })
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
          loading: true,
        });

        if (showImage) {
          this.setState({ showImage: false });
        }
        this.setState({ showFavs: !showFavs, loading: false });
      })
      .catch((err) => {
        console.log({
          msg: 'Failure: could not get favorites!',
          error: err,
        });
      });
  }

  render() {
    return this.state.loading ? (
      <ProgressSpinner />
    ) : (
      <div className="page">
        <div className="main">
          <div>
            <h1>Quotes Machine</h1>
          </div>
          <div>
            <Quotes quote={this.state.quote} />
          </div>
          <div>
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
        <div className="author-image-section">
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
