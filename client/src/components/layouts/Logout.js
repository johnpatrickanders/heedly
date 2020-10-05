import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector } from 'react-redux';
import { thunks } from '../../store/auth';
import Login from './login';
import { Button } from '@material-ui/core';

function LogoutButton() {
  const dispatch = useDispatch();
  const history = useHistory();
  const logout = async () => {
    await dispatch(thunks.logout());
    history.push('/login');
  }
  const userId = !!useSelector(state => state.auth.id);
  // if (!userId) {
  // }
  // const loggedOut = useSelector(state => state.loggedOut);
  // if (loggedOut) {
  //   return <Redirect to="/login" />
  // }
  return (
    <div id="logout-button-holder">
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}


export default LogoutButton;
