import React, { Component } from 'react';
import nanoid from 'nanoid';
import './DashboardPage.scss';

import authManager from '../utilities/auth';
import Button from '../components/Button/Button';

export default class DashboardPage extends Component {
  state = {
    orders: [],
    stages: {},
    customers: {},
    recipes: {}
  }

  componentDidMount() {
    authManager.checkIfAuthenticated((secondsLeft) => {
      if (!secondsLeft) {
        // TODO: (Q.11) the redirect to the SplashPage is missing here. can you add it? Refer to LoginPage or SplashPage for a hint.
      }
    });

    fetch('https://api.jsonbin.io/b/5d7d1c1cde91160d28724a76/4').then(res => res.json()).then((data) => {
      let orders = [];
      Object.values(data.customers).forEach((customer) => {
        if (customer.order && customer.order.length) {
          customer.order.forEach((order) => {
            // TODO: (Q.7) Each order must have a unique id. How can you use the imported nanoid library to make one instead of what's there now?
            // TODO: (Q.8) The orders initially are going into the source column. But they're supposed to go into the queue! How can you fix it?
            orders.push({
              id: Math.random() + customer.name,
              name: order,
              customer: customer.name,
              state: order.stage || 'source'
            });
          });
        }
      });

      this.setState({
        orders: orders,
        stages: data.stages,
        customers: data.customers,
        recipes: data.recipes
      });
    });
  }

  orderStateChange = (fromState, toState, tacoId) => {
    if (fromState === 'cash') {
      return;
    }
    let ordersCopy = this.state.orders;

    let foundOrder = ordersCopy.find((order, index) => {
      if (order.id === tacoId) {
        if (toState !== 'cash') {
          order.state = toState;
        } else {
          // TODO: (Q.9) Based on how good the experience, customers will pay anywhere between $5 and $15. But the number isn't rounded.
          // Thankfully, there's a function in our component called getRoundUpNumber(). How can you use that function
          // to roundup the following number?
          order.cashed = this.getNumberInRange(Math.random(), 5, 15) * 1.15;
        }
        return true;
      }
      return false;
    });

    if (foundOrder) {
      this.setState({
        orders: ordersCopy
      });
    }
  }

  getTacoCardActionTxt = (state) => {
    switch (state) {
      case 'pending':
        return 'Pick up';
      case 'source':
        return 'Assemble';
      case 'cook':
        return 'Toast';
      case 'serve':
        return 'Plate';
      case 'complete':
        return 'Cash-in';
      default:
        return 'placeholder';
    }
  }

  getNumberInRange(base, min, max) {
    return base * (max - min) + min;
  }

  getRoundUpNumber(num) {
    return Math.ceil((num * Math.pow(10, 2)) / Math.pow(10, 2));
  }

  getRevenue() {
    return this.state.orders && this.state.orders.length ? this.getTacosInState('complete').reduce((sum, curr) => {
      return curr.cashed ? sum + curr.cashed : sum;
    }, 0) : 0;
  }

  getTacosInState(stateName) {
    return (this.state.orders || []).filter((order) => order.state === stateName);
  }

  render() {
    let sourceTacos, cookTacos, serveTacos, cashedTacos;
    if (this.state.orders && this.state.orders.length) {
      sourceTacos = this.getTacosInState('source').map((taco) => {
        return <div key={taco.id} className="dashboard-page__stage-item">
          <span className="dashboard-page__stage-item-name">{taco.name}</span>
          <Button small secondary clickHandler={() => this.orderStateChange('source', 'cook', taco.id)}>{this.getTacoCardActionTxt('source')}</Button>
        </div>;
      });
      cookTacos = this.getTacosInState('cook').map((taco) => {
        return <div key={taco.id} className="dashboard-page__stage-item">
          <span className="dashboard-page__stage-item-name">{taco.name}</span>
          <Button small secondary clickHandler={() => this.orderStateChange('cook', 'serve', taco.id)}>{this.getTacoCardActionTxt('cook')}</Button>
        </div>;
      });
      serveTacos = this.getTacosInState('serve').map((taco) => {
        return <div key={taco.id} className="dashboard-page__stage-item">
          <span className="dashboard-page__stage-item-name">{taco.name}</span>
          <Button small secondary clickHandler={() => this.orderStateChange('serve', 'complete', taco.id)}>{this.getTacoCardActionTxt('serve')}</Button>
        </div>;
      });
      // TODO: (Q.10) How can you render the cashed tacos in reverse order?
      cashedTacos = this.getTacosInState('complete').map((taco) => {
          return  <div key={taco.id} className={`dashboard-page__cash-order ${taco.cashed ? 'dashboard-page__cash-order--complete' : ''}`}>
            <span className="dashboard-page__cash-order-id">{taco.id}</span>
            &nbsp;-&nbsp;{taco.name}&nbsp;-&nbsp;{taco.customer}&nbsp;-&nbsp;
            {taco.cashed ? `$${taco.cashed}` : <Button small clickHandler={() => this.orderStateChange('complete', 'cash', taco.id)}>{this.getTacoCardActionTxt('complete')}</Button>}
          </div>;
      });
    }

    return (
      <main className="dashboard-page">
        <section className="dashboard-page__kanban">
          <div className="dashboard-page__floor">
            <h3 className="dashboard-page__floor-title">{this.state.stages['pending']? this.state.stages['pending'].title : 'Customers'}</h3>
            <div className="dashboard-page__customers">
              {this.getTacosInState('pending').map((taco) => {
                return  <div key={taco.id} className="dashboard-page__customer">
                  <span className="dashboard-page__customer-order">{taco.name}</span>
                  <span className="dashboard-page__customer-name">&nbsp;for&nbsp;{taco.customer}</span>
                  <Button small clickHandler={() => this.orderStateChange('pending', 'source', taco.id)}>{this.getTacoCardActionTxt('pending')}</Button>
                </div>;
              })}
            </div>
          </div>
          <div className="dashboard-page__stage">
            <div className="dashboard-page__stage-lane dashboard-page__stage-source">
              <h3 className="dashboard-page__stage-lane-title">{this.state.stages['source'] ? this.state.stages['source'].title : 'Source'}</h3>
              <div className="dashboard-page__stage-lane-container">
                {sourceTacos}
              </div>
            </div>
            <div className="dashboard-page__stage-lane dashboard-page__stage-cook">
              <h3 className="dashboard-page__stage-lane-title">{this.state.stages['cook'] ? this.state.stages['cook'].title : 'Cook'}</h3>
              <div className="dashboard-page__stage-lane-container">
                {cookTacos}
              </div>
            </div>
            <div className="dashboard-page__stage-lane dashboard-page__stage-serve">
              <h3 className="dashboard-page__stage-lane-title">{this.state.stages['serve'] ? this.state.stages['serve'].title : 'Serve'}</h3>
              <div className="dashboard-page__stage-lane-container">
                {serveTacos}
              </div>
            </div>
          </div>
          <div className="dashboard-page__admin">
            <div className="dashboard-page__register">
              <h3 className="dashboard-page__register-title">Register</h3>
              <div className="dashboard-page__register-container">
                <div className="dashboard-page__revenue-total">
                  $<span>{this.getRevenue()}</span>
                </div>
                <div className="dashboard-page__order-history">
                  {cashedTacos}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}
