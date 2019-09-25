import React, { Component } from 'react';
import dayjs from 'dayjs';
import styles from './styles';
import withStyles from '@material-ui/core/styles/withStyles';

class ChatView extends Component {
  componentDidMount = () => {
    const container = document.getElementById('chatview-container');
    if (container) container.scrollTo(0, container.scrollHeight);
  };
  componentDidUpdate = () => {
    const container = document.getElementById('chatview-container');
    if (container) container.scrollTo(0, container.scrollHeight);
  };

  render() {
    const { classes, chat, user } = this.props;
    if (chat === undefined) {
      return <main id='chatview-container' className={classes.content}></main>;
    } else {
      return (
        <main id='chatview-container' className={classes.content}>
          {chat.messages.map((_msg, _index) => {
            return (
              <div
                key={_index}
                className={
                  _msg.sender === user ? classes.userSent : classes.friendSent
                }
              >
                <div
                  className={
                    _msg.sender === user ? classes.userTime : classes.friendTime
                  }
                >
                  {dayjs(_msg.createdAt).format('h:mm a, DD MMM YYYY')}
                </div>
                <div
                  className={
                    _msg.sender === user
                      ? classes.userMessage
                      : classes.friendMessage
                  }
                >
                  {_msg.message}
                </div>
              </div>
            );
          })}
        </main>
      );
    }
  }
}

export default withStyles(styles)(ChatView);
