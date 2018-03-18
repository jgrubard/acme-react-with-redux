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

const updateUser = (users) => {
  return {
    type: UPDATE_USER,
    users
  }
}

const deleteUser = (users) => {
  return {
  type: DELETE_USER,
  users
  }
}

const fetchUsersThunk = () => {
  return dispatch => {
    return axios.get('/api/users')
      .then(result => result.data)
      .then(users => {
        const action = getAllUsers(users)
        dispatch(action)
      })
  }
}

const postUserThunk = (newUser) => {
  return dispatch  => {
    axios.post('/api/users', { name: newUser })
      .then(result => result.data)
      .then(user => {
        const action = getNewUser(user)
        dispatch(action);
        document.location.hash = '/'
      })
      .then(() => {
        dispatch(getUserInput(''))
      })
  }
}

const updateUserThunk = (currentUser, users) => {
  return dispatch => {
    axios.put(`/api/users/${currentUser.id}`, currentUser)
      .then(result => result.data)
      .then(user => {
        const _users = users.map(_user => {
          if (_user.id === user.id * 1) {
            return user;
          }
          return _user;
        })
        const action = updateUser(_users);
        dispatch(action);
      })
      .then(() => document.location.hash = '/')
  }
}

const deleteUserThunk = (user, users) => {
  return dispatch => {
    axios.delete(`/api/users/${user.id}`)
      .then(result => result.data)
      .then(user => {
        const _users = users.filter(_user => {
          return _user.id !== user.id
        })
        const action = deleteUser(_users)
        dispatch(action)
      })
      .then(() => document.location.hash = '/')
  }
}

const reducer = (state = initialState, action) => {
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
        users: action.users
      })
    case DELETE_USER:
      return Object.assign({}, state, {
        users: action.users
      })
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware))

export default store;
export { getAllUsers, gotOneUser, getUserInput, getNewUser, gotNewNameForUser, updateUser, deleteUser, fetchUsersThunk, postUserThunk, updateUserThunk, deleteUserThunk };
