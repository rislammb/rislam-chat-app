import React, { Component } from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Paper,
  withStyles,
  CssBaseline,
  Typography
} from '@material-ui/core';
import styles from './styles';
import UserSuggest from './userSuggest';
const firebase = require('firebase');

class NewChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      message: '',
      serverError: '',
      users: []
    };
  }

  userTyping = (type, e) => {
    this.props.handleDrawerCloseFn();
    switch (type) {
      case 'username':
        this.setState({ username: e.target.value });
        break;
      case 'message':
        this.setState({ message: e.target.value });
        break;
      default:
        break;
    }
  };
  userExists = async () => {
    const usersSnapshot = await firebase
      .firestore()
      .collection('users')
      .get();
    const exists = usersSnapshot.docs
      .map(_doc => _doc.data().email)
      .includes(this.state.username);
    return exists;
  };
  buildDocKey = () => {
    return [firebase.auth().currentUser.email, this.state.username]
      .sort()
      .join(':');
  };
  chatExists = async () => {
    const docKey = this.buildDocKey();
    const chat = await firebase
      .firestore()
      .collection('chats')
      .doc(docKey)
      .get();
    return chat.exists;
  };
  goToChat = () =>
    this.props.goToChatFn(this.buildDocKey(), this.state.message);
  createChat = () => {
    this.props.newChatSubmitFn({
      sendTo: this.state.username,
      message: this.state.message
    });
  };
  submitNewChat = async e => {
    e.preventDefault();
    const userExists = await this.userExists();
    if (userExists) {
      this.setState({ serverError: '' });
      const chatExists = await this.chatExists();
      chatExists ? this.goToChat() : this.createChat();
    } else {
      this.setState({
        username: '',
        message: '',
        serverError: 'User not exists'
      });
    }
  };
  componentDidMount = async () => {
    await firebase
      .firestore()
      .collection('users')
      .onSnapshot(res => {
        const users = res.docs.map(_email => _email.data());
        this.setState({ ...this.state, users });
      });
  };
  render() {
    const { classes } = this.props;
    const { username, message, serverError, users } = this.state;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography
            className={classes.header}
            component='h1'
            variant='h5'
            color='primary'
          >
            Send A Message!
          </Typography>
          <form className={classes.form} onSubmit={e => this.submitNewChat(e)}>
            <FormControl fullWidth>
              <InputLabel htmlFor='new-chat-username'>
                Enter Your Friend's Email
              </InputLabel>
              <Input
                id='new-chat-username'
                required
                value={username}
                className={classes.input}
                autoFocus
                autoComplete='off'
                onClick={() => this.setState({ serverError: '' })}
                onChange={e => this.userTyping('username', e)}
              />
            </FormControl>
            <UserSuggest users={users} />
            <FormControl fullWidth>
              <InputLabel htmlFor='new-chat-message'>
                Enter Your Message
              </InputLabel>
              <Input
                id='new-chat-message'
                required
                value={message}
                onClick={() => this.setState({ serverError: '' })}
                multiline
                className={classes.input}
                onChange={e => this.userTyping('message', e)}
              />
            </FormControl>
            {serverError ? (
              <Typography className={classes.errorText} component='h5'>
                {serverError}
              </Typography>
            ) : null}
            <Button
              fullWidth
              className={classes.submit}
              variant='contained'
              color='primary'
              type='submit'
            >
              Submit
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(NewChat);
