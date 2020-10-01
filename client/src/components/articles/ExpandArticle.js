import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper, Typography } from '@material-ui/core';
import { useStyles } from '../layouts/Header';


const style = {
  Paper: { padding: 20, marginTop: 10, marginBottom: 10, overflowWrap: "break-word" }
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
        <img src={article.img}></img>
        <h3>{article.title}</h3>
        {article.content}
        <a href={article.url}>Read Full Story Here...</a>
      </Paper>
    </Typography>


  )
}
