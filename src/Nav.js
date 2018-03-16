import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Nav extends Component {
  render() {
    return(
      <div>
        <ul>
          <li>
            <Link to='/users'>Users</Link>
          </li>
          <li>
            <Link to='/products'>Products</Link>
          </li>
{/*          <li>
            <Link to='/users/create'>Create a User</Link>
          </li>*/}
        </ul>
      </div>
    )
  }
}

export default Nav;
