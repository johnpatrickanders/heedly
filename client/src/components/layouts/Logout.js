import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { thunks } from '../../store/auth';
import { Button } from '@material-ui/core';

function LogoutButton() {
  const dispatch = useDispatch();
  const history = useHistory();
  const logout = async () => {
    await dispatch(thunks.logout());
    history.push('/login');
  }

  return (
    <div id="logout-button-holder">
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}


export default LogoutButton;
