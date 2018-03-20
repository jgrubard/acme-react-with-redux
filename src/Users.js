import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import store, { fetchUsersThunk } from './store.js';


class Users extends Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
    const thunk = fetchUsersThunk()
    store.dispatch(thunk);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {

    const { users } = this.state;

    return (
      <div>
        <h2>
          We have
          &nbsp;
          <span className='badge badge-primary'>
            {users.length}
          </span>
          &nbsp;
          Users
        </h2>
        <h4>... and we have a few errors as well!</h4>
        <ul className='list-group'>
          {
            users.map(user => (
              <li key={user.id} className='list-group-item'>
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
