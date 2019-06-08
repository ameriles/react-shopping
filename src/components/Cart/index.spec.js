import React from 'react'
import Cart from './index'
import { Typography, TableBody, TableRow } from '@material-ui/core'
import { createShallow } from '@material-ui/core/test-utils'
import configureMockStore from 'redux-mock-store'

const mockStore = configureMockStore()

describe('<Cart />', () => {
  let shallow
  beforeAll(() => {
    shallow = createShallow({ dive: true })
  })

  it('Should render correctly with no items', () => {
    const store = mockStore({ cart: { items: [] } })
    const component = shallow(<Cart store={store} />).dive().shallow()
    const typography = component.find(Typography)

    expect(typography.children().text()).toBe('The Cart is Empty')
  })

  it('Should render correctly with 2 items', () => {
    const items = [{
      id: 1,
      name: 'Product 1',
      price: 9.99
    }, {
      id: 2,
      name: 'Product 2',
      price: 9.99
    }]
    const store = mockStore({ cart: { items: items } })
    const component = shallow(<Cart store={store} />).dive().shallow()
    const tableBody = component.find(TableBody)
    const tableRows = tableBody.find(TableRow)
    expect(tableRows.length).toBe(2)
  })
})
