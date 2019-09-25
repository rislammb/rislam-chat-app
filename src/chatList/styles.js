const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    position: 'absolute',
    left: 0,
    top: 0,
    paddingBottom: 35,
    width: '100%'
  },
  list: {
    padding: 0
  },
  listItem: {
    padding: '5px 10px',
    cursor: 'pointer'
  },
  newChatBtn: {
    borderRadius: '0px'
  },
  unreadMessage: {
    color: 'red',
    position: 'absolute',
    top: 0,
    right: '5px'
  }
});

export default styles;
