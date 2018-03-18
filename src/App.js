import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Users from './Users.js';
import Products from './Products.js'
import Nav from './Nav.js'
import User from './User.js'
import UserCreate from './UserCreate.js';

const App = () => {
  return (
    <Router>
      <div>
        <h1>ACME Users</h1>
        <h2>React & Redux</h2>
        <Route component={Nav} />
        <Switch>
          <Route exact path='/' component={Users} />
          <Route exact path='/users/create' component={UserCreate} />
          <Route exact path='/users/:id' render={({ match }) => <User id={match.params.id} />} />
          <Route exact path='/products' component={Products} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
