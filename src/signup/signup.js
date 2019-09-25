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

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      passwordConfirmation: null,
      signupError: ''
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
      case 'passwordConfirmation':
        this.setState({ passwordConfirmation: e.target.value });
        break;
      default:
        break;
    }
  };

  formIsValid = () => this.state.password === this.state.passwordConfirmation;

  submitSignup = e => {
    e.preventDefault();
    if (!this.formIsValid()) {
      this.setState({ signupError: 'Password do not match!' });
      return;
    }
    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(
        authRes => {
          const userObj = {
            email: authRes.user.email
          };
          firebase
            .firestore()
            .collection('users')
            .doc(email)
            .set(userObj)
            .then(
              () => {
                this.props.history.push('/');
              },
              () => {
                this.setState({ signupError: 'Faild to add user to database' });
              }
            );
        },
        () => {
          this.setState({ signupError: 'Faild to add user' });
        }
      );
  };

  render() {
    const { classes } = this.props;
    const { signupError } = this.state;
    return (
      <main className={classes.main}>
        <CssBaseline></CssBaseline>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h5' color='primary'>
            Sign Up!
          </Typography>
          <form onSubmit={e => this.submitSignup(e)} className={classes.form}>
            <FormControl required fullWidth margin='normal'>
              <InputLabel htmlFor='signup-email-input'>
                Enter Your Email
              </InputLabel>
              <Input
                autoComplete='email'
                onChange={e => this.userTyping('email', e)}
                autoFocus
                id='signup-email-input'
              ></Input>
            </FormControl>
            <FormControl required fullWidth margin='normal'>
              <InputLabel htmlFor='signup-password-input'>
                Create A Password
              </InputLabel>
              <Input
                type='password'
                onChange={e => this.userTyping('password', e)}
                id='signup-password-input'
              ></Input>
            </FormControl>
            <FormControl required fullWidth margin='normal'>
              <InputLabel htmlFor='signup-password-confirmation-input'>
                Confirm Your Password
              </InputLabel>
              <Input
                type='password'
                onChange={e => this.userTyping('passwordConfirmation', e)}
                id='signup-password-confirmation-input'
              ></Input>
            </FormControl>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
          {signupError ? (
            <Typography
              className={classes.errorText}
              component='h5'
              variant='body2'
            >
              {signupError}
            </Typography>
          ) : null}
          <Typography
            component='h5'
            variant='body2'
            className={classes.hasAccountHeader}
          >
            Already Have An Account?
            <Link className={classes.logInLink} to='/login'>
              Log In!
            </Link>
          </Typography>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(Signup);
