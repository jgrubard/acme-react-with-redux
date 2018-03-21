import { createStore, combineReducers, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleWare from 'redux-thunk';
import axios from 'axios';

const SET_USERS = 'SET_USERS';
const CREATE_USER = 'CREATE_USER';
const UPDATE_USER = 'UPDATE_USER';
const DELETE_USER = 'DELETE_USER';

export const setUsersThunk = () => {
  return dispatch => {
    return (
      axios.get('/api/users')
        .then(result => result.data)
        .then(users => {
          dispatch({
            type: 'SET_USERS',
            users
          });
        })
    );
  }
}

export const createUserThunk = (name) => {
  return dispatch => {
    return (
      axios.post('/api/users', { name: name })
        .then(result => result.data)
        .then(user => {
          dispatch({
            type: CREATE_USER,
            user
          })
        })
        .then(() => document.location.hash = '/')
    );
  }
}

export const updateUserThunk = (user) => {
  return dispatch => {
    return (
      axios.put(`/api/users/${user.id}`, user)
        .then(result => result.data)
        .then(user => {
          dispatch({
            type: UPDATE_USER,
            user
          })
        })
        .then(() => document.location.hash = '/')
    )

  }
}

export const deleteUserThunk = (id) => {
  return dispatch => {
    return axios.delete(`/api/users/${id}`)
      .then(result => result.data)
      .then(user => {
        dispatch({
          type: DELETE_USER,
          user: { id }
        })
      })
      .then(() => document.location.hash = '/')
  }
}

const initialState = {
  users: [],
  products: []
}

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case SET_USERS:
      state = action.users;
      break;
    case CREATE_USER:
      state = [...state, action.user];
      break;
    case UPDATE_USER:
      state = [...state.filter(user => user.id !== action.user.id), action.user];
      break;
    case DELETE_USER:
      state = state.filter(user => user.id !== action.user.id);
      break;
  }
  return state;
}

const productsReducer = (state = [], action) => {
  return state;
}

const reducer = combineReducers({
  users: usersReducer,
  products: productsReducer
});

const store = createStore(reducer, applyMiddleware(loggerMiddleware, thunkMiddleWare));

export default store;
