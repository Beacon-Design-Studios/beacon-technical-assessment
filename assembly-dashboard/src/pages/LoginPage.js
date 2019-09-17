import React, { Component } from 'react';
import './LoginPage.scss';

import authManager from '../utilities/auth';

import NumberCell from '../components/NumberCell/NumberCell';
import Button from '../components/Button/Button';

export default class LoginPage extends Component {
  state = {
    cellRefs: []
  }

  componentDidMount() {
    authManager.checkIfAuthenticated((secondsLeft) => {
      // TODO: (Q.5) What condition and code must be placed here to redirect to the dashboard if they're already logged in?
      // Refer to SplashPage.js for a hint.
    });
  }

  keyUpHandler = (e, ref) => {
    if (e.target.value !== '' && e.target.nextSibling && ((e.keyCode >= 48 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 13 || e.keyCode !== 9)) {
      e.target.nextSibling.focus();
    } else if (e.target.value === '' && e.target.previousSibling && ((e.keyCode >= 48 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 13 || e.keyCode !== 9 || e.keyCode === 8)) {
      e.target.previousSibling.focus();
    }
  }

  assignRef = (ref) => {
    this.state.cellRefs.push(ref);
  }

  loginHandler = () => {
    // the following variable contains the login string the user entered
    let userLogin = '';
    this.state.cellRefs.forEach((ref) => {
      userLogin += ref.current.value;
    });

    // TODO: (Q.6) make an HTTP call to the correct JSONBin to fetch the login code. Then, check if that code matches the one the user
    // entered. If they match, log them in using the authorize() function in the authManager and then redirect them to the dashboard.
    // Use the Fetch browser API to make the request.
  }

  render() {
    return (
      <main className="login-page">
        <div className="login-page__wrapper">
          <div className="login-page__keypad">
            <NumberCell fetchRef={this.assignRef} keyUpHandler={this.keyUpHandler}></NumberCell>
            <NumberCell fetchRef={this.assignRef} keyUpHandler={this.keyUpHandler}></NumberCell>
            <NumberCell fetchRef={this.assignRef} keyUpHandler={this.keyUpHandler}></NumberCell>
            <NumberCell fetchRef={this.assignRef} keyUpHandler={this.keyUpHandler}></NumberCell>
          </div>
          <Button clickHandler={this.loginHandler}>
            Login
          </Button>
        </div>
      </main>
    )
  }
}
