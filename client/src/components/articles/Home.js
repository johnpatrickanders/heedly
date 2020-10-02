import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { thunks } from '../../store/news';
import { useStyles } from '../layouts/Header';

export default props => {
  const classes = useStyles();

  const dispatch = useDispatch();
  // const alreadyFetched = !!topNews;
  // if (alreadyFetched) return;
  // console.log("Top news:", topNews);
  useEffect(() => {
    (async () => {
      dispatch(await thunks.dispatchGetSources());
    })();
  }, []);
  // console.log(news)

  const sources = useSelector(state => state.news.sources);
  if (!sources) return null;
  const arrOfSources = Object.values(sources);
  console.log("sources for page:", sources)



  return (
    <>
      <div className={classes.root}>
        <GridList cellHeight={180}
          className={classes.gridList}
          style={{
            alignContent: 'flex-start',
            display: "block",
          }}>
          <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
            <ListSubheader component="div">Explore A Source</ListSubheader>
          </GridListTile >
          {arrOfSources.map((tile) => (
            <GridListTile style={{ height: 60, width: 1000, overflowWrap: 'break-word' }}>
              <GridListTileBar
                title={`${tile.name} - ${(tile.country).toUpperCase()} - ${tile.description}`}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </>
  )

}
