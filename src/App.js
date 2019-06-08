import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import ShopAppBar from './components/ShopAppBar'
import ShopDrawer from './components/ShopDrawer'
import Login from './components/Login'
import Register from './components/Register'
import ProductList from './components/ProductList'
import ProductDetails from './components/ProductDetails'
import Cart from './components/Cart'
import './App.css'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    success: {
      light: '62fe4b',
      main: '#00ca00',
      dark: '#009800'
    }
  }
})

const App = () => (
  <HashRouter>
    <MuiThemeProvider theme={theme}>
      <ShopAppBar />
      <ShopDrawer />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/' exact component={ProductList} />
      <Route path='/products/:id' component={ProductDetails} />
      <Route path='/cart' component={Cart} />
    </MuiThemeProvider>
  </HashRouter>
)

export default App
