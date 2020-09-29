import React, { useCallback } from "react";
import { Redirect } from "react-router-dom";
import { connect, useDispatch, useSelector } from 'react-redux';
import { actions } from '../../store/auth';

function LogoutButton() {
  const dispatch = useDispatch();
  const logout = useCallback(
    () => dispatch(actions.removeUser()),
    [dispatch]
  )
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

// const mapStateToProps = state => {
//   return {
//     loggedOut: !state.authentication.id
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     logout: () => dispatch(logout())
//   };
// };

export default LogoutButton;
