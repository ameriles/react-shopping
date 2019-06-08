import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Paper, Grid, CircularProgress, Snackbar } from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { withStyles } from '@material-ui/core/styles'
import AppStyles from '../../jss/AppStyles'
import { setAppTitle } from '../../redux/ducks/app'
import { login } from '../../redux/ducks/login'

const styles = theme => ({
  ...AppStyles(theme)
})

class Login extends React.Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidMount () {
    this.props.setAppTitle('Login')
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.currentTarget.value
    })
  }

  onSubmit = async (event) => {
    const { history, login } = this.props
    const { username, password } = this.state

    event.preventDefault()

    const loginOk = await login(username, password)
    if (loginOk) {
      history.push('/')
    }
  }

  render () {
    const { classes, loading, error } = this.props
    const { username, password } = this.state
    const hasError = error !== null
    return (
      <div className={classes.container}>
        <Grid container justify='center'>
          <Grid item xs={12} sm={10} md={6}>
            <Paper className={classes.card}>
              <ValidatorForm className={classes.formContainer} noValidate autoComplete='off'
                onSubmit={this.onSubmit}>
                <TextValidator
                  label='Username'
                  required
                  className={classes.formField}
                  value={username}
                  onChange={this.handleChange('username')}
                  margin='normal'
                  variant='outlined'
                  validators={['required']}
                  errorMessages={['this field is required']}
                />

                <TextValidator
                  label='Password'
                  required
                  type='password'
                  value={password}
                  onChange={this.handleChange('password')}
                  className={classes.formField}
                  margin='normal'
                  variant='outlined'
                  validators={['required']}
                  errorMessages={['this field is required']}
                />

                {
                  loading
                    ? <CircularProgress />
                    : <Button color='primary' variant='contained' type='submit'
                      className={classes.formField}>Login</Button>
                }

              </ValidatorForm>
            </Paper>
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={hasError}
          autoHideDuration={6000}
          message={error ? error.message : null}
        />
      </div>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  loading: state.login.loading,
  error: state.login.error
})

const mapDispatchToProps = {
  setAppTitle,
  login
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))
