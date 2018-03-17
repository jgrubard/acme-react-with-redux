import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';

const initialState = {
  users: [],
  products: [],
  currentUser: {},
  newUser: ''
}

const GOT_USERS_FROM_SERVER = 'GOT_USERS_FROM_SERVER';
const GOT_USER = 'GOT_USER';
const GET_NEW_USER_FROM_CLIENT = 'GET_NEW_USER_FROM_CLIENT';
const GOT_NEW_USER_FROM_CLIENT = 'GOT_NEW_USER_FROM_CLIENT';

const gotUsersFromServer = (users) => {
  return {
    type: GOT_USERS_FROM_SERVER,
    users
  };
}

const gotUser = (currentUser) => {
  return {
    type: GOT_USER,
    currentUser
  }
}

const getNewUserFromClient = (newUser) => {
  return {
    type: GET_NEW_USER_FROM_CLIENT,
    newUser
  }
}

const gotNewUserFromClient = (newUser) => {
  return {
    type: GOT_NEW_USER_FROM_CLIENT,
    newUser
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USERS_FROM_SERVER:
      return Object.assign({}, state, { users: action.users });
    case GOT_USER:
      return Object.assign({}, state, { currentUser: action.currentUser });
    case GET_NEW_USER_FROM_CLIENT:
      return Object.assign({}, state, { newUser: action.newUser });
    case GOT_NEW_USER_FROM_CLIENT:
      return Object.assign({}, state, { users: [...state.users, state.newUser ]})
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(loggerMiddleware))

export default store;
export { gotUsersFromServer, gotUser, getNewUserFromClient, gotNewUserFromClient };
