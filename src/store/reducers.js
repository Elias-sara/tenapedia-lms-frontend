// // src/store/reducers.js

// import { SET_USER, LOGOUT_USER } from "./actions";

// // Initial state
// const initialState = {
//   user: null,
//   isAuthenticated: false,
// };

// // Reducer function
// const userReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_USER:
//       return {
//         ...state,
//         user: action.payload,
//         isAuthenticated: true,
//       };
//     case LOGOUT_USER:
//       return {
//         ...state,
//         user: null,
//         isAuthenticated: false,
//       };
//     default:
//       return state;
//   }
// };

// export default userReducer;
