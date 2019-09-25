import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import ChatList from '../chatList/chatList';
import styles from './styles';
import ChatView from '../chatview/chatView';
import ChatTextBox from '../chattextbox/chatTextBox';
import NewChat from '../newchat/newChat';

import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const firebase = require('firebase');

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChat: null,
      newChatFormVisible: false,
      email: null,
      chats: [],
      open: true
    };
  }
  selectChat = async chatIndex => {
    await this.setState({
      selectedChat: chatIndex,
      newChatFormVisible: false,
      open: false
    });
    this.messageRead();
  };

  newChatBtnClicked = () => {
    this.setState({
      newChatFormVisible: true,
      selectedChat: null,
      open: false
    });
  };

  buildDocKey = friend => [this.state.email, friend].sort().join(':');

  submitMessage = msg => {
    const { email, chats, selectedChat } = this.state;
    const docKey = this.buildDocKey(
      chats[selectedChat].users.filter(_usr => _usr !== email)[0]
    );
    firebase
      .firestore()
      .collection('chats')
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: email,
          message: msg,
          createdAt: new Date().toISOString()
        }),
        receiverHasRead: false
      });
  };

  clickedChatWhereNotSender = chatIndex => {
    const { chats, email } = this.state;
    return (
      chats[chatIndex].messages[chats[chatIndex].messages.length - 1].sender !==
      email
    );
  };

  messageRead = () => {
    const { email, chats, selectedChat } = this.state;
    const docKey = this.buildDocKey(
      chats[selectedChat].users.filter(_usr => _usr !== email)
    );
    if (this.clickedChatWhereNotSender(selectedChat))
      firebase
        .firestore()
        .collection('chats')
        .doc(docKey)
        .update({ receiverHasRead: true });
  };

  goToChat = async (docKey, msg) => {
    const usersInChat = docKey.split(':');
    const chat = this.state.chats.find(_chat =>
      usersInChat.every(_user => _chat.users.includes(_user))
    );
    this.setState({
      newChatFormVisible: false
    });
    await this.selectChat(this.state.chats.indexOf(chat));
    this.submitMessage(msg);
  };

  newChatSubmit = async chatObj => {
    const docKey = this.buildDocKey(chatObj.sendTo);
    await firebase
      .firestore()
      .collection('chats')
      .doc(docKey)
      .set({
        receiverHasRead: false,
        users: [this.state.email, chatObj.sendTo],
        messages: [
          {
            message: chatObj.message,
            sender: this.state.email,
            createdAt: new Date().toISOString()
          }
        ]
      });
    this.setState({
      newChatFormVisible: false
    });
    const usersInChat = docKey.split(':');
    const chat = this.state.chats.find(_chat =>
      usersInChat.every(_user => _chat.users.includes(_user))
    );
    await this.selectChat(this.state.chats.indexOf(chat));
  };

  signOut = () => firebase.auth().signOut();

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(async _usr => {
      if (!_usr) this.props.history.push('/login');
      else {
        await firebase
          .firestore()
          .collection('chats')
          .where('users', 'array-contains', _usr.email)
          .onSnapshot(async res => {
            const chats = res.docs.map(_doc => _doc.data());
            await this.setState({
              email: _usr.email,
              chats
            });
          });
      }
    });
  };
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  render() {
    const theme = withStyles(styles);
    const { email, chats, newChatFormVisible, selectedChat, open } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='fixed'
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar>
            <Typography variant='h6' noWrap className={classes.title}>
              {selectedChat !== null ? (
                <div>
                  Your conversation with{' '}
                  <span style={{ fontWeight: 'bold' }}>
                    {
                      chats[selectedChat].users
                        .filter(_usr => _usr !== email)[0]
                        .split('@')[0]
                    }
                  </span>
                </div>
              ) : (
                'Your conversation'
              )}
            </Typography>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='end'
              onClick={this.handleDrawerOpen}
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open
          })}
        >
          {newChatFormVisible ? null : (
            <ChatView user={email} chat={chats[selectedChat]} />
          )}
          {selectedChat !== null && !newChatFormVisible ? (
            <ChatTextBox
              submitMessageFn={this.submitMessage}
              messageReadFn={this.messageRead}
              selectedChat={selectedChat}
              handleDrawerCloseFn={this.handleDrawerClose}
            />
          ) : null}
          {newChatFormVisible ? (
            <NewChat
              goToChatFn={this.goToChat}
              newChatSubmitFn={this.newChatSubmit}
              handleDrawerCloseFn={this.handleDrawerClose}
            />
          ) : null}
        </main>
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='right'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List className={classes.list}>
            <ChatList
              history={this.props.history}
              newChatBtnFn={this.newChatBtnClicked}
              selectChatFn={this.selectChat}
              userEmail={email}
              chats={chats}
              selectedChatIndex={selectedChat}
            />
          </List>
          <Button
            fullWidth
            className={classes.signOutBtn}
            onClick={this.signOut}
          >
            Sign Out
          </Button>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
