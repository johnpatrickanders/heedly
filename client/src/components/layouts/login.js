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
    <>
      <Typography style={{ marginTop: '22vh' }} variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link href="http://john-anders.com" target='_blank' rel="noopener noreferrer">
          John Anders
      </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Public Vectors by '}
        <Link color='textSecondary' href="https://www.vecteezy.com/free-vector/public" target='_blank' rel="noopener noreferrer">Vecteezy</Link>
      </Typography>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: '8vh',
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
    <div style={{ display: 'flex', flexDirection: 'row', justifyItems: 'flex-start', alignContent: 'flex-start', margin: 0 }}>
      <Container
        component='main'
        className={classes.paper}
        maxWidth='xs'
        style={{ backgroundColor: '#d1d1d1', marginLeft: 0, marginBottom: 0, marginRight: '15vw', padding: '4vw' }}
      >
        <CssBaseline />
        <img src='podium_cut.png'
          alt='podium logo'
          style={{
            maxHeight: '60vh',
            maxWidth: '50vw',
            marginRight: '-2vw',
            top: '50%',
            left: '50%',
          }}>
        </img>
        <Typography
          component="h1"
          variant="h4"
          color='textSecondary'
          style={{
            textAlign: 'center',
            fontStyle: 'italic',
          }}>
          News the Mindful Way
        </Typography>
      </Container >

      <Container component="main"
        style={{ margin: 'auto' }}>
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
