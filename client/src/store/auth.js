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
      const { email } = await response.json();
      dispatch(setUser(email));
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
  }
}

function loadUser() {
  const authToken = Cookies.get("token");
  if (authToken) {
    try {
      const payload = authToken.split(".")[1];
      const decodedPayload = atob(payload);
      const payloadObj = JSON.parse(decodedPayload);
      const { data } = payloadObj;
      return data;
    } catch (e) {
      Cookies.remove("token");
    }
  }
  return {};
}

export const thunks = {
  tryLogin,
  logout,
  loadUser
};


const token = window.localStorage.getItem('REDUX_LECTURE_AUTH_TOKEN');

const initialState = {
  token,
  email: "",
  password: ""
}

function reducer(state = loadUser() ? loadUser() : null, action) {
  switch (action.type) {
    case UPDATE_EMAIL_VALUE: {
      return {
        ...state,
        user: action.value,
      };
    }
    case UPDATE_PASSWORD_VALUE: {
      return {
        ...state,
        password: action.value,
      };
    }
    case SET_USER:
      return {
        user: action.user
      }
    case REMOVE_USER:
      Cookies.remove("token");
      return {};
    case UPDATE_TOKEN_VALUE: {
      return {
        ...state,
        token: action.value,
      };
    }
    default: {
      return state;
    }
  }
}

// const loadUser() {
//   const authToken ››
// }

export default reducer;
