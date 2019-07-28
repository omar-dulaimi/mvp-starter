import React from 'react';
import QuoteItem from './QuoteItem/QuoteItem.jsx';

const List = (props) => (
    <div>
        <QuoteItem quote={props.quote} />
    </div>
);
export default List;
