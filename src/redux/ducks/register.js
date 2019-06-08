/*
  DUCK MODULE register.js 🦆
  MUST export default a function called reducer()
  MUST export its action creators as functions
  MUST have action types in the form npm-module-or-app/reducer/ACTION_TYPE
  MAY export its action types as UPPER_SNAKE_CASE, if an external reducer needs to listen for them, or if it is a published reusable library
*/

import axios from 'axios'
import { makeUrl } from '../../services'

// Action Types
const REGISTER_BEGIN = 'register/REGISTER_BEGIN'
const REGISTER_SUCCEDED = 'register/REGISTER_SUCCEDED'
const REGISTER_FAILED = 'register/REGISTER_FAILED'

// InitialState
const initialState = {
  loading: false,
  error: null
}

// Reducer
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case REGISTER_BEGIN:
      return {
        ...state,
        error: null,
        loading: true
      }
    case REGISTER_SUCCEDED:
      return {
        ...state,
        loading: false
      }
    case REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}

// Action Creators
export const registerBegin = () => ({
  type: REGISTER_BEGIN
})

export const registerSucceded = () => ({
  type: REGISTER_SUCCEDED
})

export const registerFailed = (error) => ({
  type: REGISTER_FAILED,
  error
})

// Thunks
export const register = (user) => async (dispatch, getState) => {
  try {
    dispatch(registerBegin())

    await axios.post(makeUrl('users'), user)
    dispatch(registerSucceded())
    return true
  } catch (error) {
    dispatch(registerFailed(error))
    return false
  }
}
