import React from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Button, Paper, Grid, CircularProgress, Snackbar } from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { connect } from 'react-redux'
import { setAppTitle } from '../../redux/ducks/app'
import { register } from '../../redux/ducks/register'
import AppStyles from '../../jss/AppStyles'

const styles = theme => ({
  ...AppStyles(theme)
})

class Register extends React.Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      repeatPassword: '',
      email: ''
    }
  }

  componentDidMount () {
    this.props.setAppTitle('Registration')

    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      return (value === this.state.password)
    })
  }

  onSubmit = async (event) => {
    event.preventDefault()

    const { history, register } = this.props
    const { username, password, email } = this.state
    const registerOk = await register({ username, password, email })
    if (registerOk) {
      history.push('/login')
    }
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.currentTarget.value
    })
  }

  render () {
    const { classes, error, loading } = this.props
    const { username, password, repeatPassword, email } = this.state
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

                <TextValidator
                  label='Repeat Password'
                  required
                  type='password'
                  value={repeatPassword}
                  onChange={this.handleChange('repeatPassword')}
                  className={classes.formField}
                  margin='normal'
                  variant='outlined'
                  validators={['required', 'isPasswordMatch']}
                  errorMessages={['this field is required', 'passwords doesn\'t match']}
                />

                <TextValidator
                  label='E-Mail'
                  type='email'
                  value={email}
                  onChange={this.handleChange('email')}
                  className={classes.formField}
                  margin='normal'
                  variant='outlined'
                  validators={['isEmail']}
                  errorMessages={['E-Mail must be valid']}
                />

                {
                  loading
                    ? <CircularProgress />
                    : <Button color='primary' variant='contained' type='submit'
                      className={classes.formField}>Register</Button>
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

const mapStateToProps = state => ({
  error: state.register.error,
  loading: state.register.loading
})

const mapDispatchToProps = {
  register,
  setAppTitle
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Register)))
