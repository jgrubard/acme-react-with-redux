import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import store, { getAllUsers } from '../store.js';
import axios from 'axios';

class Users extends Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  getUsers() {
    return axios.get('/api/users')
      .then(result => result.data)
      .then(users => {
        const action = getAllUsers(users)
        store.dispatch(action)
      })
  }

  componentDidMount() {
    this.getUsers();
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {

    const { users } = this.state;
    return (
      <div>
        <ul>
          {
            users.map(user => (
              <li key={user.id}>
                <Link to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default Users;
