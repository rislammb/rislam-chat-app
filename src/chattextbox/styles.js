const styles = theme => ({
  sendBtn: {
    color: theme.palette.primary.main,
    paddingLeft: 4,
    marginBottom: -15,
    cursor: 'pointer',
    '&:hover': {
      color: 'gray'
    }
  },
  chatTextBoxContainer: {
    position: 'fixed',
    width: 250,
    bottom: 5,
    left: 'calc(50% - 125px)'
  },
  chatTextBox: {
    width: 'calc(100% - 30px)',
    padding: '4px 0px 4px'
  }
});
export default styles;
