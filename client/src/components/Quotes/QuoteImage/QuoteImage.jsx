import React from 'react';

const QuoteImage = (props) => {
  return (
    <div>
      <img src={props.quoteImg} className="author-image" />
    </div>
  );
};
export default QuoteImage;
