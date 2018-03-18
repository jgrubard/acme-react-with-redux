import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from './store.js';


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
    const { pathname } = this.props.location;

    return (
      <div>
        <ul className='nav'>
          <li className='nav-item'>
            {
              pathname === '/' ? (
                <span className='nav-link disabled'>
                  Users: <span className='badge badge-secondary'>{userCount}</span>
                </span>
              ) : (
                <Link to='/' className='nav-link'>
                  Users: <span className='badge badge-primary'>{userCount}</span>
                </Link>
              )
            }
          </li>
          <li className='nav-item'>
            {
              pathname === '/products' ? (
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
              pathname === '/users/create' ? (
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
        <hr />
      </div>
    )
  }
}

export default Nav;
