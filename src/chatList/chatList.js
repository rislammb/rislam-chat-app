import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NotificationsIcon from '@material-ui/icons/Notifications';

class ChatList extends Component {
  newChat = () => {
    this.props.newChatBtnFn();
  };
  selectChat = index => {
    this.props.selectChatFn(index);
  };
  userIsSender = chat =>
    chat.messages[chat.messages.length - 1].sender === this.props.userEmail;
  render() {
    const { classes, chats, selectedChatIndex, userEmail } = this.props;
    if (chats.length > 0) {
      return (
        <main className={classes.root}>
          <Button
            variant='contained'
            fullWidth
            color='primary'
            className={classes.newChatBtn}
            onClick={this.newChat}
          >
            New Message
          </Button>
          <List className={classes.list}>
            {chats.map((_chat, _index) => {
              return (
                <div key={_index}>
                  <ListItem
                    onClick={() => this.selectChat(_index)}
                    className={classes.listItem}
                    selected={selectedChatIndex === _index}
                    alignItems='flex-start'
                  >
                    <ListItemAvatar>
                      <Avatar alt='Remy Sharp'>
                        {
                          _chat.users
                            .filter(_user => _user !== userEmail)[0]
                            .split('')[0]
                        }
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          component='h6'
                          variant='body1'
                          color='primary'
                        >
                          {_chat.users.filter(_user => _user !== userEmail)[0]}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          component='span'
                          variant='caption'
                          color='textPrimary'
                        >
                          {_chat.messages[
                            _chat.messages.length - 1
                          ].message.substring(0, 25)}
                        </Typography>
                      }
                    ></ListItemText>
                    {_chat.receiverHasRead === false &&
                    !this.userIsSender(_chat) ? (
                      <ListItemIcon>
                        <NotificationsIcon className={classes.unreadMessage} />
                      </ListItemIcon>
                    ) : null}
                  </ListItem>
                  <Divider />
                </div>
              );
            })}
          </List>
        </main>
      );
    } else {
      return (
        <main className={classes.root}>
          <Button
            variant='contained'
            fullWidth
            color='primary'
            onClick={this.newChat}
            className={classes.newChatBtn}
          >
            New Message
          </Button>
          <List className={classes.list}></List>
        </main>
      );
    }
  }
}

export default withStyles(styles)(ChatList);
