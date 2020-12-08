import React from 'react';
import { useDispatch } from 'react-redux';
import { useStyles } from '../layouts/Header';
import { Icon, IconButton } from '@material-ui/core/';
import { thunks } from '../../store/marks';

export const MyCustomButton = ({ article, userId }) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const markAsRead = () => {
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
        fullwidth='true'
      >add_circle</Icon>
    </IconButton>
  )
}
