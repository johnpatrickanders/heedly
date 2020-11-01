import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Typography } from '@material-ui/core';
import { useStyles } from '../layouts/Header';
import { Icon, IconButton } from '@material-ui/core/';
import { thunks } from '../../store/marks';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const style = {
  Paper: {
    padding: 100,
    marginTop: 20,
    marginBottom: 10,
    overflowWrap: "break-word"
  },
  img: {
    width: 300,
    height: 300,
    objectFit: "cover"
  }
}

const MyCustomButton = ({ article, userId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const deleteRead = () => {
    dispatch(thunks.dispatchDeleteArticleMark({ url: article.url, userId }));
    history.push('/reads')
  }
  return (
    <IconButton
      aria-haspopup="true"
      color="inherit"
      style={{ fontSize: 30, marginTop: 15, display: 'block' }}
    >
      <Icon onClick={deleteRead}
        className={classes.icon}
        style={{ fontSize: 30, display: 'block' }}
        fullWidth='true'
      ><HighlightOffIcon /></Icon>
    </IconButton>
  )
}

export default () => {
  const classes = useStyles();
  let pageLoad = useSelector(state => state.news.pageContent);
  const userId = useSelector(state => state.auth.id);
  if (!pageLoad) {
    return null;
  }
  const article = pageLoad.article;


  return (

    <Typography className={classes.title + "," + classes.colorSecondary} variant="h6">
      <Paper style={style.Paper}>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <img src={article.img} alt={article.title} style={style.img}></img>
        <MyCustomButton article={article} userId={userId} />
        <h3>
          {article.title}
        </h3>
        {article.content}
        <a href={article.url} style={{ display: 'block' }} > Read full story here...</a>
      </Paper>
    </Typography >
  )
}
