import React, { Component } from 'react';
import './Button.scss';
import { GenericButton } from '../generic';

export default class Button extends Component {
  render() {
    return (
      <GenericButton className={`generic-button ${this.props.small ? 'generic-button--small' : ''} ${this.props.secondary ? 'generic-button--secondary' : ''}`} onClick={this.props.clickHandler}>
        {this.props.children}
      </GenericButton>
    );
  }
}
