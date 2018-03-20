import React from 'react';
import { Link } from 'react-router-dom';


const Nav = (props) => {

  const { pathname } = props.location;

  return (
    <div>
      <ul className='nav'>
        <li className='nav-item'>
          {
            pathname === '/' ? (
              <span className='nav-link disabled'>
                Users
              </span>
            ) : (
              <Link to='/' className='nav-link'>
                Users
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
    </div>
  )
}

export default Nav;
