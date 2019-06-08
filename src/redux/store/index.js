import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import app from '../ducks/app'
import login from '../ducks/login'
import register from '../ducks/register'
import cart from '../ducks/cart'
import products from '../ducks/products'
import details from '../ducks/details'

const composeEnhancers =
   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
     : compose

const enhancer = composeEnhancers(applyMiddleware(thunk))

const rootReducer = combineReducers({
  app,
  login,
  register,
  cart,
  products,
  details
})

export default createStore(rootReducer, {}, enhancer)
