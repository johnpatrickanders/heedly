import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
// import { thunks } from '../../store/news';
import { useStyles } from '../layouts/Header';
// import { dispatchArticleMark } from '../../store/marks';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import MyReads from './Reads';

const NewsButton = () => {
  const classes = useStyles();

  return (
    <Button color='inherit' className={classes.title}>
      <Link
        style={{ color: 'white', textDecoration: 'none' }}
        className={classes.title}
        exact to="/news">
        Breaking Now
      </Link>
    </Button>
  )
}

export default NewsButton;
