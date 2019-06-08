import reducer, { addToCart, ADD_TO_CART } from './cart'

describe('Cart', () => {
  describe('Action Creators', () => {
    it('Should create an action that adds an item to the cart', () => {
      const product = {
        id: 1,
        name: 'Product 1',
        price: 9.99
      }

      const expectedAction = {
        type: ADD_TO_CART,
        product
      }

      expect(addToCart(product)).toEqual(expectedAction)
    })
  })

  describe('Reducers', () => {
    it('Should return the initial state', () => {
      const expectedState = {
        items: []
      }
      const nextState = reducer(undefined, {})
      expect(nextState).toEqual(expectedState)
    })

    it('Should return next state with one product if previous state was undefined', () => {
      const product = { id: 1, name: 'Product 1', price: 9.99 }
      const expectedState = {
        items: [product]
      }
      const action = addToCart(product)
      const nextState = reducer(undefined, action)
      expect(nextState).toEqual(expectedState)
    })

    it('Should return next state with one product if previous state was undefined', () => {
      const product1 = { id: 1, name: 'Product 1', price: 9.99 }
      const product2 = { id: 2, name: 'Product 2', price: 9.99 }
      const prevState = {
        items: [product1]
      }
      const expectedState = {
        items: [product1, product2]
      }
      const action = addToCart(product2)
      const nextState = reducer(prevState, action)
      expect(nextState).toEqual(expectedState)
    })
  })
})
