import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';

const initialState = {
  users: [],
  products: [],
  currentUser: '',
  newUser: '',
  newName: ''
}

const GOT_ALL_USERS = 'GOT_ALL_USERS';
const GOT_ONE_USER = 'GOT_ONE_USER';
const GET_USER_INPUT = 'GET_USER_INPUT';
const GET_NEW_USER = 'GET_NEW_USER';
const GOT_NEW_NAME_FOR_USER = 'GOT_NEW_NAME_FOR_USER';

const getAllUsers = (users) => {
  return {
    type: GOT_ALL_USERS,
    users
  };
}

const gotOneUser = (currentUser) => {
  return {
    type: GOT_ONE_USER,
    currentUser
  }
}

const getUserInput = (newUser) => {
  return {
    type: GET_USER_INPUT,
    newUser
  }
}

const getNewUser = (newUser) => {
  return {
    type: GET_NEW_USER,
    newUser
  }
}

const gotNewNameForUser = (newName) => {
  return {
    type: GOT_NEW_NAME_FOR_USER,
    newName
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL_USERS:
      return Object.assign({}, state, { users: action.users });
    case GOT_ONE_USER:
      return Object.assign({}, state, { currentUser: action.currentUser });
    case GET_USER_INPUT:
      return Object.assign({}, state, { newUser: action.newUser });
    case GET_NEW_USER:
      return Object.assign({}, state, { users: [...state.users, state.currentUser ]});
    case GOT_NEW_NAME_FOR_USER:
      return Object.assign({}, state, { newName: action.newName });
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(loggerMiddleware))

export default store;
export { getAllUsers, gotOneUser, getUserInput, getNewUser, gotNewNameForUser };
