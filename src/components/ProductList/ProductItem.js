import React from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import { Card, CardContent, CardMedia, CardActions, Button, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { addToCart } from '../../redux/ducks/cart'

const styles = theme => ({
  card: {
    display: 'flex',
    height: 200
  },
  media: {
    width: '60%'
  },
  cardContent: {
    width: '40%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    flexGrow: 1,
    lineHeight: 1,
    fontSize: '1.1em'
  },
  freeShipping: {
    color: theme.palette.success.main,
    textAlign: 'right'
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
})

const ProductItem = ({ id, imageUrl, name, price, freeShipping, addToCart, hasLoggedUser, classes }) => (
  <Card>
    <div className={classes.card}>
      <CardMedia className={classes.media}
        image={imageUrl}
        title={name} />
      <CardContent className={classes.cardContent}>
        <Typography component={Link} to={`/products/${id}`} variant='h6' color='textSecondary' className={classes.title}>{name}</Typography>
        <Typography variant='h5' color='textPrimary' align='right'>{numeral(price).format('$ 0.00')}</Typography>
        <div className={classes.freeShipping} style={{ visibility: freeShipping ? 'visible' : 'hidden' }}>
          <Typography variant='body1' color='inherit'>Free Shipping</Typography>
        </div>
      </CardContent>
    </div>
    {
      hasLoggedUser
        ? <CardActions className={classes.cardActions}>
          <Button size='small' color='primary' onClick={() => addToCart({ id, imageUrl, name, price, freeShipping })}>
            Add to cart
            <AddIcon />
          </Button>
        </CardActions>
        : null
    }

  </Card>
)

ProductItem.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  freeShipping: PropTypes.bool,
  hasLoggedUser: PropTypes.bool.isRequired,
  classes: PropTypes.object
}

const mapStateToProps = state => ({
  hasLoggedUser: state.login.loggedUser !== null
})

const mapDipatchToProps = ({
  addToCart
})

export default connect(mapStateToProps, mapDipatchToProps)(withStyles(styles)(ProductItem))
