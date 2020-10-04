import React, { useCallback } from "react";
import { Redirect } from "react-router-dom";
import { connect, useDispatch, useSelector } from 'react-redux';
import { thunks } from '../../store/auth';

function LogoutButton() {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(thunks.logout());
  }
  const loggedOut = useSelector(state => state.loggedOut);
  if (loggedOut) {
    return <Redirect to="/login" />
  }
  return (
    <div id="logout-button-holder">
      <button onClick={logout}>Logout</button>
    </div>
  );
}


export default LogoutButton;
