import React, { Component } from 'react';
import storageManager from '../utilities/storage';

export default class DashboardPage extends Component {
  componentDidMount() {
    if (!storageManager.checkIfExists('sessionHash')) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div>
        This is the dashboard
      </div>
    )
  }
}
