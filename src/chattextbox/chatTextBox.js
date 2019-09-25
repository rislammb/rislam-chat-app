import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import Send from '@material-ui/icons/Send';
import styles from './styles';

class ChatTextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatText: ''
    };
  }

  userTyping = e => {
    this.props.handleDrawerCloseFn();
    e.keyCode === 13
      ? this.submitMessage()
      : this.setState({ chatText: e.target.value });
  };
  messageValid = txt => txt && txt.replace(/\s/g, '').length;
  submitMessage = () => {
    const { chatText } = this.state;
    if (this.messageValid(chatText)) {
      this.props.submitMessageFn(chatText);
    }
    this.setState({ chatText: '' });
  };
  componentDidUpdate() {
    if (this.props.selectedChat !== null) this.props.messageReadFn();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.chatTextBoxContainer}>
        <TextField
          placeholder='Type your message...'
          value={this.state.chatText}
          onChange={e => this.userTyping(e)}
          id='chattextbox'
          autoFocus
          multiline
          className={classes.chatTextBox}
          onFocus={this.userClickedInput}
        />
        <Send onClick={this.submitMessage} className={classes.sendBtn} />
      </div>
    );
  }
}

export default withStyles(styles)(ChatTextBox);
