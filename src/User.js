import React, { Component } from 'react';
import store, { gotOneUser, gotNewNameForUser } from '../store.js';

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
    console.log('submit new user name')
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
