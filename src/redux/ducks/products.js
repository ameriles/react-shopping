/*
  DUCK MODULE products.js 🦆
  MUST export default a function called reducer()
  MUST export its action creators as functions
  MUST have action types in the form npm-module-or-app/reducer/ACTION_TYPE
  MAY export its action types as UPPER_SNAKE_CASE, if an external reducer needs to listen for them, or if it is a published reusable library
*/
import axios from 'axios'
import { makeUrl } from '../../services'

// Action Types
const FETCH_PRODUCTS_BEGIN = 'products/FETCH_PRODUCTS_BEGIN'
const FETCH_PRODUCTS_SUCCESS = 'products/FETCH_PRODUCTS_SUCCESS'
const FETCH_PRODUCTS_FAILURE = 'products/FETCH_PRODUCTS_FAILURE'

// Initial State
const initialState = {
  items: [],
  loading: false,
  error: null
}

// Reducer
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.items
      }
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        items: [],
        error: action.error
      }
    default:
      return state
  }
}

// Action Creators
export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN
})

export const fetchProductsSuccess = (items) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  items
})

export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  error
})

// Thunks
export const fetchProducts = () => async (dispatch, getState) => {
  try {
    dispatch(fetchProductsBegin())

    const response = await axios.get(makeUrl('products'))
    dispatch(fetchProductsSuccess(response.data))
  } catch (error) {
    fetchProductsFailure(error)
  }
}
