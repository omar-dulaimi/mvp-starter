import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Favs from './components/Favs.jsx';
import QuoteImage from './components/QuoteImage.jsx'
import List from './components/List.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: [],
      favquotes: [],
      showFavs: false,
      showImage: false
    }
  }

  //Get quotes once mounted
  componentDidMount() {
    this.generateQuote();
  }

  //generate quotes from the API through the server
  async generateQuote() {
    let that = this;
    if (that.state.showFavs) {
      that.setState({ showFavs: false });
    }
    that.setState({ showImage: true });

    await $.ajax({
      url: '/items',
      method: 'GET',
      success: (quote) => {
        console.log('quote: ', quote);
        this.setState({
          quote: quote
        });

      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  //Add a quote to favorites
  addToFavoriteQuotes() {
    var that = this;
    $.ajax({
      url: '/favquotes',
      type: "POST",
      contentType: 'application/json',
      data: JSON.stringify(that.state.quote),
      success: (result) => {
        console.log('Quote sent!')
        console.log(result);
        if (result === '^---Quote already exist!---^') {
          alert('Quote is already a favorite!');
        }
      },
      error: (err) => {
        console.log('Failure: could not send quote!');
      }
    });
  }

  //Retrieve a list of favorite quotes
  retrieveFavorites() {
    let that = this;
    if (that.state.showImage) {
      that.setState({ showImage: false });
    }
    that.setState({ showFavs: !that.state.showFavs });

    $.ajax({
      url: '/favquotes',
      method: 'GET',
      success: (favquotes) => {
        if (this.state.favquotes.length !== favquotes.length) {
          this.setState({
            favquotes: favquotes
          });
        } else {
          console.log('Info: you already have the updated list of quotes!');
        }
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  onClickFavs() {
    this.retrieveFavorites();
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
            <button type="button" className="btn btn-success" onClick={this.generateQuote.bind(this)}>Generate</button>
            <button type="button" className="btn btn-primary" onClick={this.addToFavoriteQuotes.bind(this)}>Like</button>
            <button type="button" className="btn btn-info" onClick={this.onClickFavs.bind(this)}>Favorites</button>
          </div>
        </div>
        <div className="row h-80 justify-content-center align-items-center contentainerfavs">
          {this.state.showFavs ? <Favs favquotes={this.state.favquotes} /> : null}
          {this.state.showImage ? <QuoteImage quoteImg={this.state.quote.imageUrl} /> : null}
        </div>

      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));