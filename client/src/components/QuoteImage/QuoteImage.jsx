import React from 'react';

const QuoteImage = (props) => {
  return (
    <div>
      <img src={props.quoteImg} className="img-fluid imgurl" />
    </div>
  )
}
export default QuoteImage;
