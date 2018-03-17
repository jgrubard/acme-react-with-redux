import React, { Component } from 'react';
import store, { getNewUserFromClient, gotNewUserFromClient } from '../store.js';
import axios from 'axios';

class UserCreate extends Component {
  constructor(){
    super();
    this.state = store.getState();
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmitUser = this.onSubmitUser.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onInputChange(ev) {
    // console.log(ev.target.value);
    const action = getNewUserFromClient(ev.target.value);
    store.dispatch(action);
  }

  onSubmitUser(ev) {
    ev.preventDefault();
    const name = this.state.newUser;
    // console.log(this.state.newUser)
    axios.post('/api/users', { name })
      .then(result => result.data)
      .then(user => {
        const action = gotNewUserFromClient(user)
        store.dispatch(action);
        // document.location.hash = '/users';
      })
      .then(() => {
        store.dispatch(getNewUserFromClient(''))
      })
  }

  render() {

    const { onInputChange, onSubmitUser } = this;
    // console.log(this.state)

    return (
      <div>
        <form onSubmit={onSubmitUser}>
          <input onChange={onInputChange} value={this.state.newUser} />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default UserCreate;
