import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

const initialState = {
  users: [],
  products: [],
  currentUser: {},
  newUser: '',
}

const GOT_ALL_USERS = 'GOT_ALL_USERS';
const GOT_ONE_USER = 'GOT_ONE_USER';
const GET_USER_INPUT = 'GET_USER_INPUT';
const GET_NEW_USER = 'GET_NEW_USER';
const GOT_NEW_NAME_FOR_USER = 'GOT_NEW_NAME_FOR_USER';
const UPDATE_USER = 'UPDATE_USER';
const DELETE_USER = 'DELETE_USER';

export const getAllUsers = (users) => {
  return {
    type: GOT_ALL_USERS,
    users
  };
}

export const gotOneUser = (currentUser) => {
  return {
    type: GOT_ONE_USER,
    currentUser
  }
}

export const getUserInput = (newUser) => {
  return {
    type: GET_USER_INPUT,
    newUser
  }
}

export const getNewUser = (newUser) => {
  return {
    type: GET_NEW_USER,
    newUser
  }
}

export const gotNewNameForUser = (newName) => {
  return {
    type: GOT_NEW_NAME_FOR_USER,
    newName
  }
}

export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user
  }
}

export const deleteUser = (user) => {
  return {
  type: DELETE_USER,
  user
  }
}

export const fetchUsersThunk = () => {
  return dispatch => {
    return axios.get('/api/users')
      .then(result => result.data)
      .then(users => {
        const action = getAllUsers(users);
        dispatch(action);
      })
      .catch(err => console.error(err));
  }
}

export const fetchOneUserThunk = (id) => {
  return dispatch => {
    axios.get(`/api/users/${id}`)
      .then(result => result.data)
      .then(user => {
        const action = gotOneUser(user);
        dispatch(action);
      })
      .catch(err => console.error(err));
  }
}

export const postUserThunk = (newUser) => {
  return dispatch  => {
    axios.post('/api/users', { name: newUser })
      .then(result => result.data)
      .then(user => {
        const action = getNewUser(user)
        dispatch(action);
        document.location.hash = '/'
      })
      .then(() => {
        dispatch(getUserInput(''));
      })
      .catch(err => console.error(err));
  }
}

export const updateUserThunk = (currentUser) => {
  return dispatch => {
    axios.put(`/api/users/${currentUser.id}`, currentUser)
      .then(result => result.data)
      .then(user => {
        const action = updateUser(user);
        dispatch(action);
      })
      .then(() => document.location.hash = '/')
      .catch(err => console.error(err));
  }
}

export const deleteUserThunk = (user) => {
  return dispatch => {
    axios.delete(`/api/users/${user.id}`)
      .then(result => result.data)
      .then(user => {
        const action = deleteUser(user);
        dispatch(action);
      })
      .then(() => document.location.hash = '/')
      .catch(err => console.error(err));
  }
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL_USERS:
      return Object.assign({}, state, {
        users: action.users
      });
    case GOT_ONE_USER:
      return Object.assign({}, state, {
        currentUser: action.currentUser
      });
    case GET_USER_INPUT:
      return Object.assign({}, state, {
        newUser: action.newUser
      });
    case GET_NEW_USER:
      return Object.assign({}, state, {
        users: [...state.users, state.currentUser ]
      });
    case GOT_NEW_NAME_FOR_USER:
      return Object.assign({}, state, {
        currentUser: {
          id: state.currentUser.id,
          name: action.newName
        }
      });
    case UPDATE_USER:
      return Object.assign({}, state, {
        users: [ ...state.users.filter(user => user.id !== action.user.id), action.user ]
      })
    case DELETE_USER:
      return Object.assign({}, state, {
        users: state.users.filter(user => user.id !== action.user.id)
      })
    default:
      return state;
  }
}

const store = createStore(userReducer, applyMiddleware(thunkMiddleware, loggerMiddleware))

export default store;
