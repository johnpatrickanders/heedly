import Cookies from "js-cookie";

const UPDATE_EMAIL_VALUE = 'feedly/auth/UPDATE_EMAIL_VALUE';
const UPDATE_PASSWORD_VALUE = 'feedly/auth/UPDATE_PASSWORD_VALUE';
const UPDATE_TOKEN_VALUE = 'feedly/auth/UPDATE_TOKEN_VALUE';


const SET_USER = "feedly/authentication/SET_USER";
const REMOVE_USER = "feedly/authentication/REMOVE_USER";


const updateEmailValue = value => ({ type: UPDATE_EMAIL_VALUE, value });
const updatePasswordValue = value => ({ type: UPDATE_PASSWORD_VALUE, value });
const updateTokenValue = value => ({ type: UPDATE_TOKEN_VALUE, value });

const setUser = (user) => {
  return {
    type: SET_USER,
    user
  }
}

const removeUser = () => {
  return {
    type: REMOVE_USER
  }
}
export const actions = {
  updateEmailValue,
  updatePasswordValue,
  updateTokenValue,
  setUser,
  removeUser
};

export const tryLogin = (email, password) => {
  console.log('Trying Login...')
  return async (dispatch) => {
    console.log('Sending:', email, password);
    const response = await fetch('/api/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const { id, email } = await response.json();
      dispatch(setUser({ id, email }));
    } else {
      console.error('Bad response');
    }
  }
};


const logout = () => async dispatch => {
  console.log("Logging Out")
  const res = await fetch('/api/session', {
    method: "delete"
  });
  if (res.ok) {
    dispatch(removeUser());
    Cookies.remove('token');
    console.log('Cookie removed!')
  } else {
    console.log('I couldn\'t log you out...')
  }
}

function loadUser() {
  const authToken = Cookies.get("token");
  if (authToken) {
    try {
      //gets the value from the cookie (index 0 is key, index 1 is the value)
      const payload = authToken.split(".")[1];
      //conversa base54 encoded binary string into an ASCII string
      const decodedPayload = atob(payload);
      //converts from json to JS object
      const payloadObj = JSON.parse(decodedPayload);
      console.log(payloadObj)
      //destructure data
      const data = payloadObj;
      //return user into as data (this will set the default state to the user)
      return data;
    } catch (e) {
      //any errors then remove the cookie
      Cookies.remove("token");
    }
  }
  //if no cookie set state to empty object
  return {};
}

export const thunks = {
  tryLogin,
  logout,
  loadUser
};


// const token = window.localStorage.getItem('REDUX_LECTURE_AUTH_TOKEN');


export default function reducer(state = loadUser(), action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    case REMOVE_USER:
      return {};
    default:
      return state;
  }
}

// const loadUser() {
//   const authToken ››
// }
