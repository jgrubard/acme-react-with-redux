import React, { Component } from 'react';
import store, { gotOneUser, gotNewNameForUser, updateUserThunk, deleteUserThunk } from './store.js';


class User extends Component {
  constructor() {
    super();
    this.state = store.getState();
    this.setUser = this.setUser.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onNameSubmit = this.onNameSubmit.bind(this);
    this.onDeleteUser = this.onDeleteUser.bind(this);
  }

  componentDidMount() {
    this.setUser(this.props.id);
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setUser(nextProps.id);
  // }

  componentWillUnmount() {
    store.dispatch(gotOneUser({}))
    this.unsubscribe();
  }

  setUser(id) {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    })
    const { users } = this.state;
    const user = users.find(_user => _user.id === id * 1);
    const action = gotOneUser(user);
    store.dispatch(action);
  }

  handleInputChange(ev) {
    const action = gotNewNameForUser(ev.target.value);
    store.dispatch(action);
  }

  onNameSubmit(ev) {
    ev.preventDefault()
    const { currentUser, users } = this.state;
    const thunk = updateUserThunk(currentUser, users);
    store.dispatch(thunk);
  }

  onDeleteUser(ev, user) {
    ev.preventDefault();
    const { users } = this.state;
    const thunk = deleteUserThunk(user, users);
    store.dispatch(thunk)
  }

  render() {
    const { handleInputChange, onNameSubmit, onDeleteUser } = this;
    const { currentUser } = this.state;
    return (
      <div>
        <form onSubmit={onNameSubmit}>
          <input
            className='form-control'
            value={currentUser.name}
            onChange={handleInputChange}
          />
          <button className='btn btn-primary'>Submit New Name</button>
        </form>
        <form onSubmit={(ev) => onDeleteUser(ev, currentUser)}>
          <button className='btn btn-danger'>Delete</button>
        </form>
      </div>
    );
  }
}

export default User;
