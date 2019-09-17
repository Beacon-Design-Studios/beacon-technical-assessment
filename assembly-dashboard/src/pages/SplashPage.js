import React, { Component } from 'react';
import './SplashPage.scss';
// TODO: (Q.2) the logo doesn't seem right. Can you fix it?
import tacoLogo from '../logo.svg';

import Button from '../components/Button/Button';

export default class SplashPage extends Component {
  state = {
    appName: 'Taco Assembly'
  }

  redirectToLogin = () => {
    if (this.props.history) {
      this.props.history.push('/login');
    }
  }

  render() {
    return (
      <main className="splash-page">
        <section className="splash-page__welcome">
          <div className="splash-page__logo">
            <img src={tacoLogo} alt="Taco"/>
            {/* TODO: (Q.3) Can you refactor the following code to use the app name from the state instead? */}
            <h1 className="splash-page__title">Taco Assembly</h1>
          </div>
          {/* TODO: (Q.4) Can you refactor the following code to run the redirectToLogin function instead? */}
          <Button className="splash-page__enter" clickHandler={alert}>
            Enter the kitchen
          </Button>
        </section>
      </main>
    );
  }
}
