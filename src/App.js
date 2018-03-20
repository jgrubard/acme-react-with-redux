import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import store, { fetchUsersThunk } from './store.js'

import Users from './Users.js';
import Products from './Products.js'
import Nav from './Nav.js'
import UserForm from './UserForm.js'

class  App extends Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    })
    const thunk = fetchUsersThunk()
    store.dispatch(thunk);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <Router>
        <div>
          <h1>ACME Users</h1>
          <h2>React & Redux</h2>
          <Route component={Nav} />
          <Switch>
            <Route exact path='/' component={Users} />
            <Route exact path='/users/create' component={UserForm} />
            <Route exact path='/users/:id' component={UserForm} />
            <Route exact path='/products' component={Products} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
