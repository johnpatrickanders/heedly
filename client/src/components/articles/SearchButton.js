import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { thunks } from '../../store/news';
import { useStyles } from '../layouts/Header';
import { Link } from 'react-router-dom';

const SearchButton = ({ setInput, searchString }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const searchString = useSelector(state => state.news.searchString);
  // debugger
  const runSearch = () => {
    dispatch(thunks.fetchSearchQuery(searchString));

  }
  return (
    <Button
      color='inherit'
      type='text'
      onClick={() => {
        console.log('SEARCH clicked')
        console.log('- ' + searchString)
        runSearch()
        setInput('')
      }}
      className={classes.title}>
      <Link
        style={{ color: 'white', textDecoration: 'none' }}
        className={classes.title}
        exact to="/search"
      >
        Search
      </Link>
    </Button>
  )
}

export default SearchButton;
