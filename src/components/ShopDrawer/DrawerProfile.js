import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link, withRouter } from 'react-router-dom'
import { List, ListItem, Avatar, ListItemText, ListItemSecondaryAction, ListItemIcon, IconButton } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { connect } from 'react-redux'
import { logout } from '../../redux/ducks/login'

class DrawerProfile extends React.Component {
  onCloseSession = (event) => {
    const { logout, history, location } = this.props

    logout()
    location.pathname !== '/' && history.push('/')
  }

  render () {
    const { loggedUser } = this.props
    return (
      loggedUser
        ? <List>
          <ListItem>
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
            <ListItemText primary={loggedUser.username} secondary={moment(loggedUser.loggedAt).fromNow()} />
            <ListItemSecondaryAction>
              <IconButton aria-label='Exit' onClick={this.onCloseSession}>
                <ExitToAppIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        : <List>
          <ListItem button component={Link} to='/login'>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary='Log In' />
          </ListItem>
          <ListItem button component={Link} to='/register'>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary='Register' />
          </ListItem>
        </List>
    )
  }
}

DrawerProfile.propTypes = {
  loggedUser: PropTypes.object,
  history: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  loggedUser: state.login.loggedUser
})

const mapDispatchToProps = ({
  logout
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DrawerProfile))
