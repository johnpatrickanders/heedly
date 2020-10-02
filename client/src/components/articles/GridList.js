import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { thunks } from '../../store/news';
// import tileData from './tileData';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1000,
    height: 1000,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function TitlebarGridList(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const viewArticle = (content) => {
    console.log('article clicked...');
    dispatch(thunks.getArticleContent(content));
  }
  // debugger;

  const stockImg = "https://cdn.pixabay.com/photo/2016/11/06/17/17/north-america-1803504_960_720.jpg"
  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList} style={{ alignContent: 'flex-start' }}>
        <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
          <ListSubheader component="div">{props.subTitle}</ListSubheader>
        </GridListTile>
        {props.articles.map((tile) => (
          <GridListTile key={tile.title} onClick={() => viewArticle({ ...tile })}>
            <img src={tile.img} alt={tile.description} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
