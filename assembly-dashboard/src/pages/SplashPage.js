import React, { Component } from 'react';
import './SplashPage.scss';
import taco from '../assets/taco.svg';

import Button from '../components/Button/Button';

export default class SplashPage extends Component {
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
            <img src={taco} alt="Taco"/>
            <h1 className="splash-page__title">Taco Assembly</h1>
          </div>
          <Button className="splash-page__enter" clickHandler={this.redirectToLogin}>
            Enter the kitchen
          </Button>
        </section>
      </main>
    );
  }
}
