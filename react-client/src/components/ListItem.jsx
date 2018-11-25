import React from 'react';

const ListItem = (props) => (
  <div>
    <blockquote className="blockquote">
      <p className="mb-0 quote">{props.quote.quote}</p>
      <footer className="blockquote-footer author text-dark">{props.quote.author}</footer>
    </blockquote>
  </div>
)

export default ListItem;