import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { SwipeableDrawer } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import DrawerProfile from './DrawerProfile'
import DrawerCart from './DrawerCart'
import { setDrawer } from '../../redux/ducks/app'

const styles = theme => ({
  drawer: {
    width: 250
  }
})

const ShopDrawer = ({ open, openDrawer, closeDrawer, hasLoggedUser, classes }) => (
  <SwipeableDrawer
    open={open}
    onClose={closeDrawer}
    onOpen={openDrawer}>

    <div className={classes.drawer}
      tabIndex={0}
      role='button'
      onClick={closeDrawer}
      onKeyDown={closeDrawer}>
      <DrawerProfile />
      {hasLoggedUser ? <DrawerCart /> : null}
    </div>
  </SwipeableDrawer>
)

ShopDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  classes: PropTypes.object
}

const mapStateToProps = state => ({
  open: state.app.isDrawerOpen,
  hasLoggedUser: state.login.loggedUser !== null
})

const mapDispatchToProps = {
  openDrawer: () => setDrawer(true),
  closeDrawer: () => setDrawer(false)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShopDrawer))
