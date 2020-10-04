import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper, Typography } from '@material-ui/core';
import { useStyles } from '../layouts/Header';
import Icon from '@material-ui/core/Icon';
import { thunks } from '../../store/marks';

const style = {
  Paper: {
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    overflowWrap: "break-word"
  },
  img: {
    width: 300,
    height: 300,
    objectFit: "cover"
  }
}

// const PlusIcon = props => {

//   return
// }

export default props => {
  const classes = useStyles();
  const dispatch = useDispatch()
  let pageLoad = useSelector(state => state.news.pageContent);
  const userId = useSelector(state => state.auth.id);
  if (!pageLoad) {
    return null;
  }
  const article = pageLoad.article;


  const markAsRead = () => {
    // console.log('content:', article.title)
    dispatch(thunks.dispatchArticleMark({ article, userId }))
  }

  return (

    <Typography className={classes.title + "," + classes.colorSecondary} variant="h6">
      <Paper style={style.Paper}>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <img src={article.img} style={style.img}></img>
        <Icon onClick={markAsRead} className={classes.icon} style={{ fontSize: 30, marginTop: 15, display: 'block' }}>add_circle</Icon>
        <h3>
          {article.title}
        </h3>
        {article.content}
        <a href={article.url} style={{ display: 'block' }} > Read full story here...</a>
      </Paper>
    </Typography >


  )
}
