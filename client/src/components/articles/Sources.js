import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import { thunks } from '../../store/news';
import { useStyles } from '../layouts/Header';
import { Typography } from '@material-ui/core';

export default props => {
  const classes = useStyles();

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      dispatch(await thunks.dispatchGetSources());
    })();
  }, []);

  const sources = useSelector(state => state.news.sources);
  if (!sources) return null;
  const arrOfSources = Object.values(sources);
  console.log("sources for page:", sources)



  return (
    <div alignSelf='center' className={classes.root} style={{ maxWidth: '80vh', justifyContent: 'center' }}>
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
          <GridListTile style={{ height: 70, width: '80vh', overflowWrap: 'break-word' }}>
            <GridListTileBar
              style={{
                height: 'auto',
                display: 'flex',
                flexDirection: 'row',
                minHeight: '100',
                alignContent: 'baseline',
                margin: 'auto'
              }}
              title={
                <Link to={`/sources/${tile.id}`} style={{ fontSize: 20, color: 'white', textDecoration: 'none' }}>
                  <Typography overflowWrap='true' paragraph={true}>
                    <p>
                      {`${tile.name} - ${(tile.country).toUpperCase()} - ${tile.description}`}
                    </p>
                  </Typography>
                </Link>}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )

}
