import { FETCH_REPOS, FETCH_USER, SEARCH_ITEMS } from './types';

export const fetchRepos = (username) => dispatch => {
    let url = `https://api.github.com/users/`+{username};
    console.log(username);
    fetch(`https://api.github.com/users/${username}`)
    .then(res => res.json())
    .then(user =>dispatch({
      type: FETCH_USER,
      payload: user
    }));
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(res => res.json())
      .then(repos =>dispatch( {
        type: FETCH_REPOS,
        payload: repos
      })
    );
}

export const searchItems = id => {
  console.log("searchItemsAction");
  return {
    type: SEARCH_ITEMS,
    payload: id
  };
}