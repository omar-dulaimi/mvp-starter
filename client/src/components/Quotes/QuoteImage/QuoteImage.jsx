import React from 'react';
import defualtImage from '../../../assets/404.png';

const QuoteImage = (props) => {
  return (
    <div>
      <img
        src={props.quoteImg ? props.quoteImg : defualtImage}
        className="author-image"
      />
    </div>
  );
};
export default QuoteImage;
