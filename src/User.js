import React, { Component } from 'react';
import store, { gotOneUser, gotNewNameForUser, updateUser } from '../store.js';
import axios from 'axios';

class User extends Component {
  constructor() {
    super();
    this.state = store.getState();
    this.setUser = this.setUser.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onNameSubmit = this.onNameSubmit.bind(this);
  }

  componentDidMount() {
    this.setUser(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setUser(nextProps.id);
  }

  componentWillUnmount() {
    store.dispatch(gotOneUser(''))
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
    // console.log('this.state.currentUser:', this.state.currentUser)
    axios.put(`/api/users/${currentUser.id}`, currentUser)
      .then(result => result.data)
      .then(user => {
        const _users = this.state.users.filter(_user => {
          if (_user.id !== user.id * 1) {
            return _user;
          }
        })
        const action = updateUser(_users);
        store.dispatch(action);
        document.location.hash('/')
      })


  }



  render() {
    const { handleInputChange, onNameSubmit } = this;
    const { name } = this.state.currentUser;
    return (
      <div>
        <form onSubmit={onNameSubmit}>
          <input
            value={name}
            onChange={handleInputChange}
          />
          <button>Submit New Name</button>
        </form>
        <button>Delete</button>
      </div>
    );
  }
}

export default User;
