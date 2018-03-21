import React, { Component } from 'react';
import store, { updateUserThunk, deleteUserThunk } from './store.js'

class User extends Component {
  constructor(props) {
    super(props);
    const user = store.getState().users.find(_user => _user.id === props.id)
    this.state = {
      name: user ? user.name : ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickDelete = this.onSave.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      const user = store.getState().users.find(_user => _user.id === this.props.id);
      if (user) {
        this.setState({ name: user.name });
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleInputChange(ev) {
    this.setState({ name: ev.target.value });
  }

  onSave(ev, user) {
    ev.preventDefault()
    store.dispatch(updateUserThunk(user))
  }

  onClickDelete(ev) {
    ev.preventDefault()
    store.dispatch(deleteUserThunk(this.props.id))
  }

  render() {

    const { handleInputChange, onSave, onClickDelete } = this;
    const { name } = this.state;

    const user = { name: this.state.name, id: this.props.id};

    // console.log(user);

    return (
      <div>
        <form onSubmit={ (ev) => onSave(ev, user) }>
          <input onChange={ handleInputChange } value={ name } className='form-control'/>
          <button className='btn btn-primary' style={{ 'marginTop':'15px'}}>Update</button>
        </form>
          <button onClick={ onClickDelete } className='btn btn-danger'>Delete</button>
      </div>
    );
  }
}

export default User;
