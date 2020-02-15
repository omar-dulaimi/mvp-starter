import React from 'react';
import { css } from '@emotion/core';
import PropagateLoader from 'react-spinners/PropagateLoader';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: rgb(65, 115, 230);
`;

export default class ProgressSpinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    return (
      <div className="sweet-loading center">
        <PropagateLoader
          css={override}
          size={30}
          //size={"150px"} this also works
          color={'#123abc'}
          loading={this.state.loading}
        />
      </div>
    );
  }
}
