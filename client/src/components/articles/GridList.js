import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { thunks } from '../../store/news';
import MouseOverPopover from '../layouts/PopOver';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '60vw',
    height: '90vh',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function TitlebarGridList(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const viewArticle = ({ tile, reads }) => {
    dispatch(thunks.getArticleContent(tile));
    if (reads) {
      history.push('/expand-read');
    } else {
      history.push('/expand-article');
    }
  }
  // const action = React.forwardRef((props, ref, title, description) => {

  //   return (
  //     <IconButton ref={ref} aria-label={`info about ${title}`} className={classes.icon}>
  //       <MouseOverPopover
  //         popText={description} />
  //     </IconButton>
  //   )

  // })
  return (
    <div className={classes.root}>
      <GridList cellHeight={180}
        className={classes.gridList}
        style={{ alignContent: 'flex-start', marginTop: '10px' }}>
        <GridListTile key="Subheader"
          cols={3}
          style={{ height: 'auto' }}>
          <ListSubheader component="div">
            <Typography variant="h3"
              color="textPrimary"
              style={{ marginLeft: '-19px', marginTop: '20px' }}>
              {props.subTitle}
            </Typography>
          </ListSubheader>
        </GridListTile>
        {props.articles.map((tile) => (
          <GridListTile key={tile.title} onClick={() => viewArticle({ tile, reads: props.reads })}>
            <img src={tile.img} alt={tile.description} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                  <MouseOverPopover
                    popText={tile.description} />
                </IconButton>
              }
            />

          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
