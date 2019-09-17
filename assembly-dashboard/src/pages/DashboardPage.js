import React, { Component } from 'react';
import './DashboardPage.scss';

import authManager from '../utilities/auth';

export default class DashboardPage extends Component {
  componentDidMount() {
    authManager.checkIfAuthenticated((secondsLeft) => {
      if (!secondsLeft) {
        this.props.history.push('/');
      }
    });
  }

  render() {
    return (
      <main className="dashboard-page">
        <section className="dashboard-page__kanban">
          <div className="dashboard-page__tables">
            <div className="dashboard-page__customers">
              <div className="dashboard-page__customer">This is a customer</div>
            </div>
          </div>
          <div className="dashboard-page__stage">
            <div className="dashboard-page__stage-source"><div className="dashboard-page__stage-item">This is an item</div></div>
            <div className="dashboard-page__stage-cook"></div>
            <div className="dashboard-page__stage-serve"></div>
          </div>
          <div className="dashboard-page__kitchen">
            <div className="dashboard-page__ingredients">
              <div className="dashboard-page__ingredient">This is an ingredient</div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}
