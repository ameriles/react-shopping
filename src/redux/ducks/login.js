/*
  DUCK MODULE login.js 🦆
  MUST export default a function called reducer()
  MUST export its action creators as functions
  MUST have action types in the form npm-module-or-app/reducer/ACTION_TYPE
  MAY export its action types as UPPER_SNAKE_CASE, if an external reducer needs to listen for them, or if it is a published reusable library
*/

import axios from 'axios'
import { makeUrl } from '../../services'

// Action Types
export const LOGIN_BEGIN = 'login/LOGIN_BEGIN'
export const LOGIN_SUCCEDED = 'login/LOGIN_SUCCEDED'
export const LOGIN_FAILED = 'login/LOGIN_FAILED'
export const CLOSE_SESSION = 'login/CLOSE_SESSION'

// InitialState
const initialState = {
  loggedUser: null,
  loading: false,
  error: null
}

// Reducer
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case LOGIN_BEGIN:
      return {
        ...state,
        loggedUser: null,
        error: null,
        loading: true
      }
    case LOGIN_SUCCEDED:
      return {
        ...state,
        loggedUser: action.loggedUser,
        loading: false
      }
    case LOGIN_FAILED:
      return {
        ...state,
        loggedUser: null,
        loading: false,
        error: action.error
      }
    case CLOSE_SESSION:
      return {
        ...state,
        loggedUser: null
      }
    default:
      return state
  }
}

// Action Creators
export const closeSession = () => ({
  type: CLOSE_SESSION
})

export const loginBegin = () => ({
  type: LOGIN_BEGIN
})

export const loginSucceded = (user) => ({
  type: LOGIN_SUCCEDED,
  loggedUser: user
})

export const loginFailed = (error) => ({
  type: LOGIN_FAILED,
  error
})

// Thunks
export const login = (username, password) => async (dispatch, getState) => {
  try {
    dispatch(loginBegin())

    const response = await axios.get(makeUrl(`users?username=${username}&password=${password}`))
    if (response.data.length === 0) {
      throw new Error('Incorrect username or password')
    }

    const loggedUser = response.data[0]
    loggedUser.loggedAt = new Date()
    dispatch(loginSucceded(loggedUser))
    return true
  } catch (error) {
    dispatch(loginFailed(error))
    return false
  }
}
