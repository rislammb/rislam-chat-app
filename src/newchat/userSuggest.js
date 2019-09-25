import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';
const UserSuggest = props => {
  const search = document.getElementById('new-chat-username');
  const matchList = document.getElementById('user-suggestions');
  const searchEmails = searchText => {
    const users = props.users;
    // Get matches to current text input
    if (users !== undefined) {
      let matches = users.filter(user => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return user.email.match(regex);
      });
      if (searchText.length === 0) {
        matches = [];
      }
      outputHtml(matches);
    }
  };
  // Show results in Html
  const outputHtml = matches => {
    if (matches.length > 0) {
      const html = matches
        .map(
          match => `
            <div class='emailListItem'>
              ${match.email}
            </div>
          `
        )
        .join('');
      matchList.innerHTML = html;
    } else {
      matchList.innerHTML = '';
    }
    search.addEventListener('blur', () => (matchList.innerHTML = ''));
  };
  if (search !== null) {
    search.addEventListener('input', () => searchEmails(search.value));
  }
  return <div id='user-suggestions'></div>;
};

export default withStyles(styles)(UserSuggest);
