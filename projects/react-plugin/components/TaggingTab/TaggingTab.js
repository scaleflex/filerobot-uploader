import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner } from '../Spinner';



class TaggingTab extends Component {
  constructor() {
    super();

    this.state = {
    };
  }

  render() {
    return (
      <div>
        Hello world, tagging!
      </div>
    )
  }
}

export default connect(
  null,
  null
)(TaggingTab);