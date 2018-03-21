import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from './store.js'

class Nav extends Component {
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

  componentWillUnMount() {
    this.unsubscribe();
  }

  render() {
    const path = this.props.location.pathname;

    const count = this.state.users.length;

    return (
      <ul className='nav'>
        <li className='nav-item'>
          {
            path === '/' ? (
              <span className='nav-link disabled'>
                Users &nbsp;
                <span className='badge badge-secondary'>
                  { count }
                </span>
              </span>
            ) : (
              <Link to='/' className='nav-link'>
                Users &nbsp;
                <span className='badge badge-primary'>
                  { count }
                </span>
              </Link>
            )
          }
        </li>
        <li className='nav-item'>
          {
            path === '/products' ? (
              <span className='nav-link disabled'>
                Products
              </span>
            ) : (
              <Link to='/products' className='nav-link'>
                Products
              </Link>
            )
          }
        </li>
        <li className='nav-item'>
          {
            path === '/users/create' ? (
              <span className='nav-link disabled'>
                Create a User
              </span>
            ) : (
              <Link to='/users/create' className='nav-link'>
                Create a User
              </Link>
            )
          }
        </li>
      </ul>
    );
  }
}

export default Nav;
