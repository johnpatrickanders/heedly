import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import { thunks } from '../../store/news';
import { Typography } from '@material-ui/core';

export default props => {

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      dispatch(await thunks.dispatchGetSources());
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sources = useSelector(state => state.news.sources);
  if (!sources) return null;
  const arrOfSources = Object.values(sources);

  return (
    <div >
      <GridList>
        <GridListTile key="Subheader" style={{ height: 'auto' }}>
          <ListSubheader component="div">
            <Typography variant="h3" color="textPrimary" style={{ marginLeft: '-19px', marginTop: '20px' }}>
              Explore by Source
            </Typography>
          </ListSubheader>
        </GridListTile >
        {arrOfSources.map((tile) => (
          <GridListTile key={tile.id} style={{ height: '8vh', width: '100vw', overflowWrap: 'break-word' }}>
            <GridListTileBar
              style={{
                height: 'auto',
                display: 'flex',
                flexDirection: 'row',
                minHeight: '6vh',
                minWidth: '80vw'
              }}
              title={
                <Link to={`/sources/${tile.id}`} style={{ fontSize: 20, color: 'white', textDecoration: 'none' }}>
                  <Typography overflowwrap='true' >
                    {`${tile.name} - ${(tile.country).toUpperCase()} - ${tile.description}`}
                  </Typography>
                </Link>}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )

}
