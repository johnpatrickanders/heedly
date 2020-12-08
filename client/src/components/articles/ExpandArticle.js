import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Typography } from '@material-ui/core';
import { useStyles } from '../layouts/Header';
import { Icon, IconButton } from '@material-ui/core/';
import { thunks } from '../../store/marks';

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
  // const dispatch = useDispatch();

  // const markAsRead = () => {
  //   dispatch(thunks.dispatchArticleMark({ article, userId }))
  // }
  return (
    <IconButton
      // onClick={markAsRead}
      aria-haspopup="true"
      color="inherit"
      style={{ fontSize: 30, marginTop: 15, display: 'block' }}
    >
      <Icon
        className={classes.icon}
        style={{ fontSize: 30, display: 'block' }}
        fullwidth='true'
      >add_circle</Icon>
    </IconButton>
  )
}

export default () => {
  const dispatch = useDispatch();


  const classes = useStyles();
  let pageLoad = useSelector(state => state.news.pageContent);
  const userId = useSelector(state => state.auth.id);
  if (!pageLoad) {
    return null;
  }
  const article = pageLoad.article;

  const markAsRead = () => {
    dispatch(thunks.dispatchArticleMark({ article, userId }))
  }

  return (

    <Typography className={classes.title + "," + classes.colorSecondary} variant="h6">
      <Paper style={style.Paper} style={{
        maxWidth: '60vw',
        marginTop: '25px',
        display: 'flex-start',
        flexDirection: 'column',
        alignSelf: 'center',
        padding: '25px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <img src={article.img} alt={article.title} style={style.img}></img>
        <MyCustomButton onClick={markAsRead} article={article} userId={userId} />
        <h3>
          {article.title}
        </h3>
        {article.content}
        <a href={article.url} target='_blank' style={{ display: 'block' }} > Read full story here...</a>
      </Paper>
    </Typography >
  )
}
