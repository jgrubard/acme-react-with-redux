import React, { Component } from 'react';
import store, { gotOneUser, getUserInput, gotNewNameForUser, postUserThunk, updateUserThunk, deleteUserThunk } from './store.js';

class UserForm extends Component {
  constructor() {
    super();
    this.state = store.getState();

    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleUserSubmit = this.handleUserSubmit.bind(this);
    this.onDeleteUser = this.onDeleteUser.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    })
    if (this.props.location.pathname !== '/users/create') {
      this.setCurrentUser(this.props.match.params.id)
    }
  }

  componentWillUnmount() {
    store.dispatch(gotOneUser({}));
    this.unsubscribe();
  }

  setCurrentUser(id) {
    const { users } = this.state;
    const user = users.find(_user => _user.id === id * 1
    );
    const action = gotOneUser(user);
    store.dispatch(action)
  }

  handleInput(ev) {
    if(this.props.location.pathname === '/users/create') {
      const action = getUserInput(ev.target.value);
      store.dispatch(action);
    }
    const action = gotNewNameForUser(ev.target.value);
    store.dispatch(action);
  }

  handleUserSubmit(ev) {
    ev.preventDefault()
    const { newUser, currentUser, users } = this.state;
    if(this.props.location.pathname === '/users/create') {
      const thunk = postUserThunk(newUser)
      store.dispatch(thunk)
    } else {
      const thunk = updateUserThunk(currentUser, users);
      store.dispatch(thunk);
    }
  }

  onDeleteUser(ev, user) {
    ev.preventDefault();
    const { users } = this.state;
    const thunk = deleteUserThunk(user, users);
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
              <button className='btn btn-primary' disabled={!newUser.length}>
                Create User
              </button>
            </form>
          ) : (
            <div>
              <form onSubmit={handleUserSubmit}>
                <input className='form-control' value={currentUser.name} onChange={handleInput}/>
                <button className='btn btn-success'>
                  Submit
                </button>
              </form>
              <form onSubmit={(ev) => onDeleteUser(ev, currentUser)}>
                <button className='btn btn-danger'>
                  Delete
                </button>
              </form>
            </div>
          )
        }
      </div>
    );
  }
}

export default UserForm;
