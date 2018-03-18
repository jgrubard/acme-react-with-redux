import React, { Component } from 'react';
import store, { getUserInput, postUserThunk } from '../store.js';


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

    const thunk = postUserThunk(newUser)
    store.dispatch(thunk)
  }

  render() {

    const { onInputChange, onSubmitUser } = this;
    const { newUser } = this.state;

    return (
      <div>
        <form onSubmit={onSubmitUser}>
          <input className='form-control' onChange={onInputChange} value={newUser} />
          <button disabled={!newUser.length} className='btn btn-success'>Submit</button>
        </form>
      </div>
    );
  }
}

export default UserCreate;
