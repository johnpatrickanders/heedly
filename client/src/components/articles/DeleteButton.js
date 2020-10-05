import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper, Typography } from '@material-ui/core';
import { useStyles } from '../layouts/Header';
import { Icon, IconButton } from '@material-ui/core/';
import { thunks } from '../../store/marks';

export const MyCustomButton = ({ article, userId }) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const markAsRead = () => {
    // console.log('content:', article.title)
    dispatch(thunks.dispatchArticleMark({ article, userId }))
  }
  return (
    <IconButton
      aria-haspopup="true"
      color="inherit"
      style={{ fontSize: 30, marginTop: 15, display: 'block' }}
    >
      <Icon onClick={markAsRead}
        className={classes.icon}
        style={{ fontSize: 30, display: 'block' }}
        fullWidth='true'
      >add_circle</Icon>
    </IconButton>
  )
}
