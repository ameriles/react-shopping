import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import { Paper, Table, TableHead, TableCell, TableRow, TableBody, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import AppStyles from '../../jss/AppStyles'
import { setAppTitle } from '../../redux/ducks/app'

const styles = theme => ({
  ...AppStyles(theme),
  root: {
    width: '100%',
    marginTop: theme.spacing.unit,
    overflowX: 'auto'
  },
  table: {
    width: '100%'
  }
})

class Cart extends React.Component {
  componentDidMount () {
    this.props.setAppTitle('My Cart')
  }

  render () {
    const { cartItems, classes } = this.props
    const groupedItems = []
    for (const item of cartItems) {
      const foundItem = groupedItems.find(x => x.id === item.id)
      if (foundItem) {
        foundItem.quantity++
      } else {
        groupedItems.push({ ...item, quantity: 1 })
      }
    }

    const tableRows = groupedItems.map(row => (
      <TableRow key={row.id}>
        <TableCell component='th' scope='row'>
          {row.name}
        </TableCell>
        <TableCell align='right'>{`${row.quantity} x ${numeral(row.price).format('$ 0.00')}`}</TableCell>
        <TableCell align='right'>{numeral(row.quantity * row.price).format('$ 0.00')}</TableCell>
      </TableRow>
    ))

    const tableEmpty = <TableRow>
      <TableCell colSpan={3}>
        <Typography variant='body1' color='textSecondary'>The Cart is Empty</Typography>
      </TableCell>
    </TableRow>

    const tableBody = cartItems.length > 0
      ? tableRows
      : tableEmpty

    return (
      <div className={classes.container}>
        <Paper className={classes.root}>
          <Table className={classes.table} padding='dense'>
            <TableHead>
              <TableRow>
                <TableCell>Article</TableCell>
                <TableCell align='right'>Price</TableCell>
                <TableCell align='right'>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableBody}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  cartItems: state.cart.items
})

const mapDispatchToProps = {
  setAppTitle
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Cart))
