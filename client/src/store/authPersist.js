

// export const login = (email, password) => {
//   return async dispatch => {
//     const response = await fetch(`/api/session`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     if (response.ok) {
//       const { player } = await response.json();
//       dispatch(setUser(player));
//     }
//   };
// };



// export default function reducer(, action) {
//   switch (action.type) {
//     case SET_USER:
//       return action.user;
//     case REMOVE_USER:
//       return {};
//     default:
//       return state;
//   }
// }
