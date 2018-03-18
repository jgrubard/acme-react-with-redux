import React, { Component } from 'react';
import store, { gotOneUser, gotNewNameForUser, updateUser, deleteUser } from '../store.js';
import axios from 'axios';

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

  componentWillReceiveProps(nextProps) {
    this.setUser(nextProps.id);
  }

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
    const { currentUser } = this.state;
    axios.put(`/api/users/${currentUser.id}`, currentUser)
      .then(result => result.data)
      .then(user => {
        const _users = this.state.users.map(_user => {
          if (_user.id === user.id * 1) {
            return user;
          }
          return _user;
        })
        const action = updateUser(_users);
        store.dispatch(action);
      })
      .then(() => document.location.hash = '/')
  }

  onDeleteUser(ev, user) {
    ev.preventDefault();
    axios.delete(`/api/users/${user.id}`)
      .then(result => result.data)
      .then(user => {
        const _users = this.state.users.filter(_user => {
          return _user.id !== user.id
        })
        const action = deleteUser(_users)
        store.dispatch(action)
      })
      .then(() => document.location.hash = '/')
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
