import React from 'react';
import { Grid, Paper } from '@material-ui/core';

const style = {
  Paper: { padding: 20, marginTop: 10, marginBottom: 10 }
}

export default props =>
  <Grid container>
    <Grid item sm>
      <Paper style={style.Paper}>
        Left Pane
      </Paper>
    </Grid>
    <Grid item sm>
      <Paper style={style.Paper}>
        Right Pane
      </Paper>
    </Grid>
  </Grid>
