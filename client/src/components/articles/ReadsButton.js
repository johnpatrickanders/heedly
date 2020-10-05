import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
// import { thunks } from '../../store/news';
import { useStyles } from '../layouts/Header';
// import { dispatchArticleMark } from '../../store/marks';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import MyReads from './Reads';


const ReadsButton = () => {
  const classes = useStyles();
  // const dispatch = useDispatch();
  // const searchString = useSelector(state => state.news.searchString)
  // const runSearch = () => dispatch(thunks.fetchSearchQuery(searchString));
  const handleClick = () => {
    return (
      <Button exact to="/reads"><MyReads /></Button>
    )
  }
  return (
    <Button color='inherit' className={classes.title}>
      <Link
        style={{ textDecoration: 'none' }} className={classes.title} exact to="/reads">My Reads
      </Link>
    </Button>
  )
}

export default ReadsButton;


//<Route exact path="/">
// {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
// </Route>
