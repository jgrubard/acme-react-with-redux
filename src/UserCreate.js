import React, { Component } from 'react';
import store, { getUserInput, getNewUser } from '../store.js';
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
    const action = getUserInput(ev.target.value);
    store.dispatch(action);
  }

  onSubmitUser(ev) {
    ev.preventDefault();
    const { newUser } = this.state;
    axios.post('/api/users', { name: newUser })
      .then(result => result.data)
      .then(user => {
        const action = getNewUser(user)
        store.dispatch(action);
        document.location.hash = '/'
      })
      .then(() => {
        store.dispatch(getUserInput(''))
      })
  }

  render() {

    const { onInputChange, onSubmitUser } = this;

    return (
      <div>
        <form onSubmit={onSubmitUser}>
          <input className='form-control' onChange={onInputChange} value={this.state.newUser} />
          <button className='btn btn-success'>Submit</button>
        </form>
      </div>
    );
  }
}

export default UserCreate;
