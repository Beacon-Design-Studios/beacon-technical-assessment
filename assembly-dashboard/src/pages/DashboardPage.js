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
          <div className="dashboard-page__floor">
            <h3 className="dashboard-page__floor-title">Customers</h3>
            <div className="dashboard-page__customers">
              <div className="dashboard-page__customer">This is a customer</div>
            </div>
          </div>
          <div className="dashboard-page__stage">
            <div className="dashboard-page__stage-lane-container dashboard-page__stage-source">
              <h3 className="dashboard-page__stage-lane-title">Source</h3>
              <div className="dashboard-page__stage-lane">
                <div className="dashboard-page__stage-item">This is an item</div>
              </div>
            </div>
            <div className="dashboard-page__stage-lane-container dashboard-page__stage-cook">
              <h3 className="dashboard-page__stage-lane-title">Cook</h3>
              <div className="dashboard-page__stage-lane">
                <div className="dashboard-page__stage-item">This is an item</div>
              </div>
            </div>
            <div className="dashboard-page__stage-lane-container dashboard-page__stage-serve">
              <h3 className="dashboard-page__stage-lane-title">Serve</h3>
              <div className="dashboard-page__stage-lane">
                <div className="dashboard-page__stage-item">This is an item</div>
              </div>
            </div>
          </div>
          <div className="dashboard-page__admin">
            <div className="dashboard-page__register">
              <div className="dashboard-page__cash-order">Complete</div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}
