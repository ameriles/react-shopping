/*
  DUCK MODULE cart.js 🦆
  MUST export default a function called reducer()
  MUST export its action creators as functions
  MUST have action types in the form npm-module-or-app/reducer/ACTION_TYPE
  MAY export its action types as UPPER_SNAKE_CASE, if an external reducer needs to listen for them, or if it is a published reusable library
*/

// Action Types
export const ADD_TO_CART = 'cart/ADD_TO_CART'
export const EMPTY_CART = 'cart/EMPTY_CART'

// Initial State
const initialState = { items: [] }

// Reducer
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.product]
      }
    case EMPTY_CART:
      return {
        ...state,
        items: []
      }
    default:
      return state
  }
}

// Action Creators
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  product
})

export const emptyCart = () => ({
  type: EMPTY_CART
})
