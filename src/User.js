import React, { Component } from 'react';
import store, { gotUser } from '../store.js'

class User extends Component {
  constructor() {
    super();
    this.state = store.getState();
    this.getUser = this.getUser.bind(this)
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    })
    const user = this.getUser(this.props.id)
    const action = gotUser(user);
    store.dispatch(action);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getUser(id) {
    const user = this.state.users.find(user => user.id === id * 1);
    return user;
  }



  render() {

    const { currentUser } = this.state;

    return (
      <div>
        {currentUser.name}
      </div>
    );
  }
}

export default User;
