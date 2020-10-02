import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
// import { thunks } from '../../store/news';
import { useStyles } from '../layouts/Header';
// import { dispatchArticleMark } from '../../store/marks';
import { Link } from 'react-router-dom';

const SourcesButton = () => {
  const classes = useStyles();

  return (
    <Button color='inherit' className={classes.title}>
      <Link
        style={{ color: 'white', textDecoration: 'none' }}
        className={classes.title}
        exact to="/sources">
        Sources
      </Link>
    </Button>
  )
}

export default SourcesButton;
