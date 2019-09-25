const styles = theme => ({
  main: {
    width: '95%',
    display: 'block', // Fix IE 11 issue
    margin: '0px auto',
    [theme.breakpoints.up(400 + theme.spacing(2 * 1))]: {
      width: '95%',
      maxWidth: 450,
      margin: '0px auto'
    }
  },
  paper: {
    width: '100%',
    padding: theme.spacing(2),
    marginTop: 80
  },
  header: {
    textAlign: 'center'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  input: {
    margin: '10px 0'
  },
  submit: {
    marginTop: theme.spacing(2)
  },
  errorText: {
    marginTop: 8,
    color: 'red',
    textAlign: 'center'
  }
});

export default styles;
