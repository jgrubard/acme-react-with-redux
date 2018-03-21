import React, { Component } from 'react';
import store, { createUserThunk } from './store.js';

class UserCreate extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    }
    this.handleUserInput = this.handleUserInput.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  handleUserInput(ev) {
    this.setState({ name: ev.target.value });
  }

  onSave(ev) {
    ev.preventDefault();
    store.dispatch(createUserThunk(this.state.name));
  }

  render() {

    const { handleUserInput, onSave } = this;
    const { name } = this.state;

    return (
      <div>
        <form onSubmit={ onSave }>
          <input onChange={ handleUserInput } value={ name }  className='form-control'/>
          <button className='btn btn-primary' style={{'marginTop': '15px' }} disabled={ !name.length }>
            Create User
          </button>
        </form>
      </div>
    );
  }
}

export default UserCreate;
