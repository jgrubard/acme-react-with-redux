import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from '../store.js';


class Nav extends Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {

    const userCount = this.state.users.length;

    return (
      <div>
        <ul>
          <li>
            <Link to='/'>Users: {userCount}</Link>
          </li>
          <li>
            <Link to='/products'>Products</Link>
          </li>
          <li>
            <Link to='/users/create'>Create a User</Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default Nav;
