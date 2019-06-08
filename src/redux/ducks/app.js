/*
  DUCK MODULE app.js 🦆
  MUST export default a function called reducer()
  MUST export its action creators as functions
  MUST have action types in the form npm-module-or-app/reducer/ACTION_TYPE
  MAY export its action types as UPPER_SNAKE_CASE, if an external reducer needs to listen for them, or if it is a published reusable library
*/

// Action Types
export const SET_APP_TITLE = 'app/SET_APP_TITLE'
export const SET_DRAWER = 'app/SET_DRAWER'

// Initial State
const initialState = { title: 'React Shopping', isDrawerOpen: false }

// Reducer
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SET_APP_TITLE:
      return {
        ...state,
        title: action.title
      }
    case SET_DRAWER:
      return {
        ...state,
        isDrawerOpen: action.isOpen
      }
    default:
      return state
  }
}

// Action Creators
export const setAppTitle = (title) => ({
  type: SET_APP_TITLE,
  title
})

export const setDrawer = (isOpen) => ({
  type: SET_DRAWER,
  isOpen
})
