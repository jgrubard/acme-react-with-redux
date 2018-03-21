import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from './store';

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: store.getState().users
    }
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({ users: store.getState().users });
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {

    const { users } = this.state;

    return (
      <div>
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
