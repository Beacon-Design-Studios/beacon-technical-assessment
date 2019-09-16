import React, { Component } from 'react';
import './NumberCell.scss';
import { GenericInput } from '../generic';

export default class NumberCell extends Component {
  constructor(props) {
    super(props);
    this.textInputRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.fetchRef) {
      this.props.fetchRef(this.textInputRef);
    }
  }


  render() {
    return (
      <GenericInput className="number-cell" maxLength="1" type="text" ref={this.textInputRef} onKeyUp={(e) => this.props.keyUpHandler(e, this.textInputRef)}></GenericInput>
    );
  }
}
