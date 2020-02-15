import React from 'react';

const Favs = (props) => {
  var result = props.favquotes.map((fav, index) => (
    <div key={index} className="favs">
      <blockquote className="blockquote">
        <p className="mb-0 quote">{fav.quote}</p>
        <footer className="blockquote-footer author text-dark">
          {fav.author}
        </footer>
      </blockquote>
    </div>
  ));

  return <div>{result}</div>;
};
export default Favs;
