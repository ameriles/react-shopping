import React from 'react'
import Login from './index'
import { createShallow } from '@material-ui/core/test-utils'
import configureMockStore from 'redux-mock-store'
import { SET_APP_TITLE } from '../../redux/ducks/app'

const mockStore = configureMockStore()

describe('<Login />', () => {
  let shallow
  beforeAll(() => {
    shallow = createShallow({ dive: true })
  })

  it('Should invoke setAppTitle onComponentDidMount', () => {
    const store = mockStore({
      login: {
        loggedUser: null,
        loading: false,
        error: null
      }
    })

    const expectedActions = [{
      type: SET_APP_TITLE,
      title: 'Login'
    }]

    const component = shallow(<Login store={store} />).dive().shallow({
      disableLifecycleMethods: false
    })

    expect(component).toBeDefined()
    expect(store.getActions()).toEqual(expectedActions)
  })
})
