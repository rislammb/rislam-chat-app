import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

const firebase = require('firebase');

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      loginError: ''
    };
  }

  userTyping = (type, e) => {
    switch (type) {
      case 'email':
        this.setState({ email: e.target.value });
        break;
      case 'password':
        this.setState({ password: e.target.value });
        break;
      default:
        break;
    }
  };

  submitLogin = e => {
    e.preventDefault();
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        () => {
          this.props.history.push('/');
        },
        err => {
          this.setState({ loginError: err.code });
        }
      );
  };

  render() {
    const { classes } = this.props;
    const { loginError } = this.state;
    return (
      <main className={classes.main}>
        <CssBaseline></CssBaseline>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h5' color='primary'>
            Log In!
          </Typography>
          <form onSubmit={e => this.submitLogin(e)} className={classes.form}>
            <FormControl required fullWidth margin='normal'>
              <InputLabel htmlFor='login-email-input'>
                Enter Your Email
              </InputLabel>
              <Input
                autoComplete='email'
                onChange={e => this.userTyping('email', e)}
                autoFocus
                id='login-email-input'
              ></Input>
            </FormControl>
            <FormControl required fullWidth margin='normal'>
              <InputLabel htmlFor='login-password-input'>
                Enter your Password
              </InputLabel>
              <Input
                type='password'
                onChange={e => this.userTyping('password', e)}
                id='login-password-input'
              ></Input>
            </FormControl>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Log In
            </Button>
          </form>
          {loginError ? (
            <Typography
              className={classes.errorText}
              component='h5'
              variant='body2'
            >
              {loginError}
            </Typography>
          ) : null}
          <Typography
            component='h5'
            variant='body2'
            className={classes.noAccountHeader}
          >
            Don't Have An Account?
            <Link className={classes.signUpLink} to='/signup'>
              Sign Up!
            </Link>
          </Typography>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(Login);
