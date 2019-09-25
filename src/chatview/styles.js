const styles = theme => ({
  content: {
    overflow: 'auto',
    padding: 8,
    height: 'calc(100vh - 155px)',
    marginTop: 45,
    margin: 'auto',
    [theme.breakpoints.up(600)]: {
      height: 'calc(100vh - 105px)',
      maxWidth: 800,
      marginTop: 55
    }
  },
  userSent: {
    float: 'left',
    clear: 'both',
    marginTop: 10,
    maxWidth: '90%'
  },

  userMessage: {
    wordWrap: 'break-word',
    backgroundColor: '#c6ecf1',
    color: '#111',
    padding: '10px 15px',
    borderRadius: 15
  },

  friendSent: {
    float: 'right',
    clear: 'both',
    marginTop: 10,
    maxWidth: '90%'
  },
  friendMessage: {
    padding: '10px 15px',
    wordWrap: 'break-word',
    backgroundColor: '#f1d6f5',
    color: '#111',
    borderRadius: 15
  },
  userTime: {
    fontSize: 10,
    padding: 5,
    color: '#333'
  },
  friendTime: {
    textAlign: 'right',
    fontSize: 10,
    padding: 5,
    color: '#333'
  }
});

export default styles;
