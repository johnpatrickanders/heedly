import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { thunks } from '../../store/news';
import { useStyles } from '../layouts/Header';
import { Link } from 'react-router-dom';

const SearchButton = ({ setInput, searchString }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const runSearch = () => {
    if (!searchString) return;
    dispatch(thunks.fetchSearchQuery(searchString));

  }
  return (
    <Button
      color='inherit'
      type='text'
      onClick={() => {
        runSearch();
        setInput('');
      }}
      className={classes.title}>
      <Link
        style={{ color: 'white', textDecoration: 'none' }}
        className={classes.title}
        exact="true" to={!!searchString ? "/search" : "/news"}
      >
        Search
      </Link>
    </Button>
  )
}

export default SearchButton;
