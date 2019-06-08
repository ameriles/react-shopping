import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import { withRouter } from 'react-router-dom'
import { Paper, Typography, CircularProgress, Grid, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles'
import AppStyles from '../../jss/AppStyles'
import { setAppTitle } from '../../redux/ducks/app'
import { addToCart } from '../../redux/ducks/cart'
import { fetchDetails } from '../../redux/ducks/details'

const styles = theme => ({
  ...AppStyles(theme),
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center'
  },
  image: {
    width: '100%'
  },
  freeShipping: {
    color: theme.palette.success.main
  }
})

class ProductDetails extends React.Component {
  componentDidMount () {
    this.props.fetchDetails(this.props.match.params.id)
  }

  render () {
    const { addToCart, hasLoggedUser, product, loading, classes } = this.props

    const body = product
      ? <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <img src={product.imageUrl} alt={product.name} className={classes.image} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant='h5' color='textSecondary'>{product.name}</Typography>
            <Typography variant='h4'>{numeral(product.price).format('$ 0.00')}</Typography>
            <div className={classes.freeShipping} style={{ visibility: product.freeShipping ? 'visible' : 'hidden' }}>
              <Typography variant='body1' color='inherit'>Free Shipping</Typography>
            </div>

            {
              hasLoggedUser
                ? <Button variant='contained' color='primary' onClick={() => addToCart(product)}>
                    Add to Cart
                  <AddIcon />
                </Button>
                : null
            }

            <Typography variant='body1' align='justify'>{product.description}</Typography>
          </Grid>
        </Grid>

      </Paper>
      : <Typography variant='body1' color='error'>Couldn't load product details</Typography>

    return (
      <div className={classes.container}>
        {
          loading
            ? <CircularProgress />
            : body
        }
      </div>
    )
  }
}

ProductDetails.propTypes = {
  hasLoggedUser: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  hasLoggedUser: state.login.loggedUser !== null,
  product: state.details.product,
  loading: state.details.loading,
  error: state.details.error
})

const mapDispatchToProps = {
  setAppTitle,
  addToCart,
  fetchDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(ProductDetails)))
