import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper, Typography } from '@material-ui/core';
import { useStyles } from '../layouts/Header';
import Icon from '@material-ui/core/Icon';


const style = {
  Paper: { padding: 20, marginTop: 10, marginBottom: 10, overflowWrap: "break-word" },
  img: {
    width: 300,
    height: 300,
    objectFit: "cover"
  }
}

export default props => {
  const classes = useStyles();
  let pageLoad = useSelector(state => state.news.pageContent);
  if (!pageLoad) {
    return null;
  }

  console.log('content:', pageLoad.article)
  const article = pageLoad.article;

  return (

    <Typography className={classes.title} variant="h6">
      <Paper style={style.Paper}>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <img src={article.img} style={style.img}></img>
        <Icon style={{ fontSize: 30, marginTop: 15, display: 'block' }}>add_circle</Icon>
        <h3>
          {article.title}
        </h3>
        {article.content}
        <a href={article.url} style={{ display: 'block' }} > Read full story here...</a>
      </Paper>
    </Typography >


  )
}
