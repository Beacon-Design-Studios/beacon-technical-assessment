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
      if (secondsLeft) {
        this.props.history.push('/dashboard');
      }
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
    let userLogin = '';
    this.state.cellRefs.forEach((ref) => {
      userLogin += ref.current.value;
    });

    fetch('https://api.jsonbin.io/b/5d7e46efcfe9d23b10f658bb').then((resp) => {
      return resp.json();
    }).then((data) => {
      if (data.login.keycode === userLogin) {
        authManager.authorize();
        this.props.history.push('/dashboard');
      }
    });
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
