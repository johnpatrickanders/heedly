import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { thunks } from '../../store/news';
import { useStyles } from '../layouts/Header';
import { dispatchArticleMark } from '../../store/marks';

const SearchButton = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const searchString = useSelector(state => state.news.searchString)
  const runSearch = () => dispatch(dispatchArticleMark());
  // thunks.fetchSearchQuery(searchString)
  return (
    <Button color='inherit' onClick={runSearch} className={classes.title}>Search</Button>
  )
}

export default SearchButton;
