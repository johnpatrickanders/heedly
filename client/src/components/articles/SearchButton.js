import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { thunks } from '../../store/news';
import { useStyles } from '../layouts/Header';
import { Link } from 'react-router-dom';

const SearchButton = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const searchString = useSelector(state => state.news.searchString)
  const runSearch = () => {
    dispatch(thunks.fetchSearchQuery(searchString));
    // dispatch(thunks.dispatchUpdateSearchQuery(''));
  }

  function handleEnter(e) {
    if (e.key === 'Enter') {
      console.log(e.target.value);
      runSearch();
    }
    console.log('NOT ENTER')
  }
  window.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      console.log("HIIIIIII");
      runSearch();
      // setSearchString('');
    }
  })
  return (
    <form action='/search' method='get'>
      <Button onSubmit={handleEnter}
        color='inherit'
        type='text'
        onSubmit={runSearch}
        onClick={runSearch}
        className={classes.title}>
        <Link
          style={{ color: 'white', textDecoration: 'none' }}
          className={classes.title}
          exact to="/search">
          Search
      </Link>
      </Button>
    </form>
  )
}

export default SearchButton;
