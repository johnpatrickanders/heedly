import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { thunks } from '../../store/news';
import { useStyles } from '../layouts/Header';
import { Link } from 'react-router-dom';
// import { dispatchArticleMark } from '../../store/marks';

const SearchButton = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const searchString = useSelector(state => state.news.searchString)
  const runSearch = () => dispatch(thunks.fetchSearchQuery(searchString));
  return (
    <Button color='inherit' onClick={runSearch} className={classes.title}>
      <Link
        style={{ color: 'white', textDecoration: 'none' }}
        className={classes.title}
        exact to="/search">
        Search
      </Link>
    </Button>
  )
}

export default SearchButton;
