import React from 'react';
import ListItem from '../ListItem/ListItem.jsx';

const List = (props) => (
    <div>
        <ListItem quote={props.quote} />
    </div>
);
export default List;
