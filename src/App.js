import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Users from './Users.js';
import Products from './Products.js'
import Nav from './Nav.js'
import User from './User.js'
// import UserCreate from './UserCreate';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <h1>ACME</h1>
          <Route component={Nav} />
          <Route exact path='/users' component={Users} />
          <Route exact path='/users/:id' render={({ match }) => <User id={match.params.id} />} />
          {/*<Route exact path='/users/create' component={UserCreate} />*/}
          <Route exact path='/products' component={Products} />
        </div>
      </Router>
    );
  }
}

export default App;
