import { createStore } from 'redux';

const initialState = {
  users: [],
  products: [],
  user: {}
}

const GOT_USERS_FROM_SERVER = 'GOT_USERS_FROM_SERVER';
const GOT_USER = 'GOT_USER';

const gotUsersFromServer = (users) => {
  return {
    type: GOT_USERS_FROM_SERVER,
    users
  };
}

const gotUser = (user) => {
  return {
    type: GOT_USER,
    user
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USERS_FROM_SERVER:
      return Object.assign({}, state, { users: action.users });
    case GOT_USER:
      return Object.assign({}, state, { user: action.user });
    default:
      return state;
  }
}

const store = createStore(reducer)

export default store;
export { gotUsersFromServer, gotUser };
