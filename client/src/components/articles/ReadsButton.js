import React from 'react';
import { Button } from '@material-ui/core';
import { useStyles } from '../layouts/Header';
import { Link } from 'react-router-dom';



const ReadsButton = () => {
  const classes = useStyles();

  return (
    <Button color='inherit' className={classes.title}>
      <Link
        style={{ color: 'white', textDecoration: 'none' }} className={classes.title} exact="true" to="/reads">My Reads
      </Link>
    </Button>
  )
}

export default ReadsButton;
