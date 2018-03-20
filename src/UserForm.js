import React, { Component } from 'react';
import store, { gotOneUser, getUserInput, gotNewNameForUser, postUserThunk, updateUserThunk, deleteUserThunk, fetchOneUserThunk } from './store.js';
import { Link } from 'react-router-dom';
// import axios from 'axios';

class UserForm extends Component {
  constructor() {
    super();
    this.state = store.getState();

    // this.setCurrentUser = this.setCurrentUser.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleUserSubmit = this.handleUserSubmit.bind(this);
    this.onDeleteUser = this.onDeleteUser.bind(this);
  }

  componentDidMount() {

    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    })
    if (this.props.location.pathname !== '/users/create') {
      const id = document.location.hash.split('/')[2] * 1;
      const thunk = fetchOneUserThunk(id);
      store.dispatch(thunk);
    }
  }

  componentWillUnmount() {
    store.dispatch(gotOneUser({}));
    this.unsubscribe();
  }

  handleInput(ev) {
    if (this.props.location.pathname === '/users/create') {
      const action = getUserInput(ev.target.value);
      store.dispatch(action);
    }
    else {
      const action = gotNewNameForUser(ev.target.value);
      store.dispatch(action);
    }
  }

  handleUserSubmit(ev) {
    ev.preventDefault()
    const { newUser, currentUser } = this.state;
    if (this.props.location.pathname === '/users/create') {
      const thunk = postUserThunk(newUser)
      store.dispatch(thunk)
    } else {
      const thunk = updateUserThunk(currentUser);
      store.dispatch(thunk);
    }
  }

  onDeleteUser(user) {
    const thunk = deleteUserThunk(user);
    store.dispatch(thunk)
  }

  render() {

    const path = this.props.location.pathname;
    const { currentUser, newUser } = this.state;
    const { handleInput, handleUserSubmit, onDeleteUser } = this;

    return (
      <div>
        {
          path === '/users/create' ? (
            <form onSubmit={handleUserSubmit}>
              <input className='form-control' onChange={handleInput} value={newUser} />
              <button className='btn btn-primary' disabled={!newUser.length} style={{'marginTop': '15px'}}>
                Create User
              </button>
            </form>
          ) : (
            <div>
              <form onSubmit={handleUserSubmit}>
                <input className='form-control' value={currentUser.name} onChange={handleInput}/>
                <button className='btn btn-success' style={{'marginTop': '15px'}}>
                  Submit
                </button>
              </form>
              <button className='btn btn-danger' onClick={() => onDeleteUser(currentUser)}>
                Delete
              </button>
              <div>
                <Link to='/'>
                  <button className='btn btn-info' style={{'marginTop': '15px'}}>
                    Cancel
                  </button>
                </Link>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default UserForm;
