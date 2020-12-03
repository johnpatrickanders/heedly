import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { tryLogin, actions } from '../../store/auth';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Heedly
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const updateEmailValue = e => setEmail(e.target.value);
  const updatePasswordValue = e => setPassword(e.target.value);

  const login = async (e) => {
    e.preventDefault()
    dispatch(actions.updateEmailValue());
    dispatch(actions.updatePasswordValue());
    dispatch(tryLogin(email, password));
    history.push('/news');
  }
  const demoLogin = async (e) => {
    e.preventDefault()
    dispatch(tryLogin("demo@example.com", "password"));
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyItems: 'flex-start', alignContent: 'flex-start' }}>
      <Container component='main' className={classes.paper}
        maxWidth='xs'
      >
        <CssBaseline />
        <img src='podium_cut.png'
          style={{
            maxHeight: '60vh',
            maxWidth: '50vw',
            margin: 'auto',
            top: '50%',
            left: '50%',
            border: '3px',
            strokeWeight: '2px',
            borderRadius: '3px',
            storke: 'black'
          }}>
        </img>
      </Container>

      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
        </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={updateEmailValue}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              onChange={updatePasswordValue}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={login}
            >
              Sign In
          </Button>
            <Grid container>
              <Grid item>
                <Link href='/signup' variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: 15 }}>
              <Grid item>
                <Link onClick={demoLogin} href='/news' variant="body2">
                  {"Or Sign in as Demo User"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
