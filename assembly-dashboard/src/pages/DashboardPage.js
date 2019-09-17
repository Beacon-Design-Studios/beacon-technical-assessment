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
    recipes: {},
    reference: {}
  }

  componentDidMount() {
    authManager.checkIfAuthenticated((secondsLeft) => {
      if (!secondsLeft) {
        this.props.history.push('/');
      }
    });

    fetch('https://api.jsonbin.io/b/5d7d1c1cde91160d28724a76/4').then(res => res.json()).then((data) => {
      let orders = [];
      Object.values(data.customers).forEach((customer) => {
        if (customer.order && customer.order.length) {
          customer.order.forEach((order) => {
            orders.push({
              id: nanoid(),
              name: order,
              customer: customer.name,
              state: order.stage || 'pending'
            });
          });
        }
      });

      let stagesModified = data.stages;
      stagesModified['pending'].tacos.push(...orders.filter(order => order.state === 'pending'));

      this.setState({
        stages: stagesModified,
        customers: data.customers,
        orders: orders,
        recipes: data.recipes,
        reference: data
      });
    });
  }

  orderStateChange = (fromState, toState, tacoId) => {
    let stagesCopy = this.state.stages;

    let foundOrder = stagesCopy[fromState].tacos.find((order, index) => {
      if (order.id === tacoId) {
        if (toState !== 'cash') {
          stagesCopy[fromState].tacos.splice(index, 1);
          order.state = toState;
          stagesCopy[toState].tacos.push(order);
        } else {
          order.cashed =  this.getRoundUpNumber(this.getNumberInRange(Math.random(), 5, 15) * 1.15);
        }
        return true;
      }
    });

    if (foundOrder) {
      this.setState({
        stages: stagesCopy
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
    }
  }

  getNumberInRange(base, min, max) {
    return base * (max - min) + min;
  }

  getRoundUpNumber(num) {
    return Math.ceil((num * Math.pow(10, 2)) / Math.pow(10, 2));
  }

  getRevenue() {
    if (!!this.state && !!this.state.stages["complete"]) {
      return this.state.stages["complete"].tacos.reduce((sum, curr) => {
        return curr.cashed ? sum + curr.cashed : sum;
      }, 0);
    }
    return 0;
  }

  render() {
    let sourceTacos, cookTacos, serveTacos, cashedTacos;
    if (Object.values(this.state.stages) && Object.values(this.state.stages).length) {
      sourceTacos = this.state.stages["source"].tacos.map((taco) => {
        return <div key={taco.id} className="dashboard-page__stage-item">
          <span className="dashboard-page__stage-item-name">{taco.name}</span>
          <Button small secondary clickHandler={() => this.orderStateChange('source', 'cook', taco.id)}>{this.getTacoCardActionTxt('source')}</Button>
        </div>;
      });
      cookTacos = this.state.stages["cook"].tacos.map((taco) => {
        return <div key={taco.id} className="dashboard-page__stage-item">
          <span className="dashboard-page__stage-item-name">{taco.name}</span>
          <Button small secondary clickHandler={() => this.orderStateChange('cook', 'serve', taco.id)}>{this.getTacoCardActionTxt('cook')}</Button>
        </div>;
      });
      serveTacos = this.state.stages["serve"].tacos.map((taco) => {
        return <div key={taco.id} className="dashboard-page__stage-item">
          <span className="dashboard-page__stage-item-name">{taco.name}</span>
          <Button small secondary clickHandler={() => this.orderStateChange('serve', 'complete', taco.id)}>{this.getTacoCardActionTxt('serve')}</Button>
        </div>;
      });
      cashedTacos = this.state.stages["complete"].tacos.slice().reverse().map((taco) => {
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
            <h3 className="dashboard-page__floor-title">Customers</h3>
            <div className="dashboard-page__customers">
              {(this.state.stages["pending"] ? this.state.stages["pending"].tacos : []).map((taco) => {
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
