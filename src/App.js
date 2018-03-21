import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import store, { setUsersThunk } from './store';

import Users from './Users.js';
import User from './User.js';
import UserCreate from './UserCreate.js';
import  Products from './Products.js';
import Nav from './Nav.js';

const App = () => {
  return (

      <Router>
        <div>
          <h2>Acme Users & Products</h2>
          <h3>React & Redux</h3>
          <Route component={Nav} />
          <Switch>
            <Route exact path='/' component={Users} />
            <Route exact path='/products' component={Products} />
            <Route exact path='/users/create' component={UserCreate} />
            <Route exact path='/users/:id' render={({ match }) => <User id={match.params.id * 1} />} />

          </Switch>
        </div>
      </Router>

  );
}

store.dispatch(setUsersThunk());

export default App;
