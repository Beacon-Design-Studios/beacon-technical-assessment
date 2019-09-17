import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// custom
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import SplashPage from './pages/SplashPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* TODO: something isn't right here... can you fix it? */}
        <Route exact path="/" component={SplashPage}></Route>
        <Route path="/dashboard" component={LoginPage}></Route>
        <Route path="/login" component={DashboardPage}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
