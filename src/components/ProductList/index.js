import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ProductItem from './ProductItem'
import { Grid, CircularProgress } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import AppStyles from '../../jss/AppStyles'
import { setAppTitle } from '../../redux/ducks/app'
import { fetchProducts } from '../../redux/ducks/products'

const styles = theme => ({
  ...AppStyles(theme),
  loading: {
    margin: '0 auto'
  }
})

class ProductList extends React.Component {
  componentDidMount () {
    this.props.setAppTitle('React Shopping')
    this.props.fetchProducts()
  }

  render () {
    const { classes, items, loading } = this.props
    const list = items.map(p =>
      <Grid item key={p.id} xs={12} sm={6} md={4} lg={3}>
        <ProductItem id={p.id} imageUrl={p.imageUrl} name={p.name} price={p.price} freeShipping={p.freeShipping} />
      </Grid>
    )

    return (
      <Grid container spacing={16} className={classes.container}>
        {!loading ? list : <CircularProgress className={classes.loading} />}
      </Grid>
    )
  }
}

ProductList.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  items: state.products.items,
  loading: state.products.loading,
  error: state.products.error
})

const mapDispatchToProps = {
  setAppTitle,
  fetchProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductList))
