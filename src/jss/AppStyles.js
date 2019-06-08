const AppStyles = (theme) => ({
  container: {
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.background.default,
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      marginTop: 64
    }
  },
  formField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  card: {
    padding: theme.spacing.unit,
    margin: theme.spacing.unit
  }
})
export default AppStyles
