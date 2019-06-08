/*
  DUCK MODULE details.js 🦆
  MUST export default a function called reducer()
  MUST export its action creators as functions
  MUST have action types in the form npm-module-or-app/reducer/ACTION_TYPE
  MAY export its action types as UPPER_SNAKE_CASE, if an external reducer needs to listen for them, or if it is a published reusable library
*/
import axios from 'axios'
import { makeUrl } from '../../services'
import { setAppTitle } from './app'

// Action Types
const FETCH_DETAILS_BEGIN = 'details/FETCH_DETAILS_BEGIN'
const FETCH_DETAILS_SUCCESS = 'details/FETCH_DETAILS_SUCCESS'
const FETCH_DETAILS_FAILURE = 'details/FETCH_DETAILS_FAILURE'

// Initial State
const initialState = {
  product: null,
  loading: false,
  error: null
}

// Reducer
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }
    case FETCH_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.product
      }
    case FETCH_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        product: null,
        error: action.error
      }
    default:
      return state
  }
}

// Action Creators
export const fetchDetailsBegin = () => ({
  type: FETCH_DETAILS_BEGIN
})

export const fetchDetailsSuccess = (product) => ({
  type: FETCH_DETAILS_SUCCESS,
  product
})

export const fetchDetailsFailure = (error) => ({
  type: FETCH_DETAILS_FAILURE,
  error
})

// Thunks
export const fetchDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(fetchDetailsBegin())
    dispatch(setAppTitle('Cargando...'))

    const response = await axios.get(makeUrl(`products/${id}`))
    const product = response.data

    dispatch(fetchDetailsSuccess(product))
    dispatch(setAppTitle(product.name))
  } catch (error) {
    fetchDetailsFailure(error)
    dispatch(setAppTitle('Error'))
  }
}
