import axios from "axios";

const GET_USER = "GET_USER";

const initialState = {
  user: {},
  loggedIn: false
};

export function getUser() {
  return {
    type: GET_USER,
    payload: axios.get("/api/getUser")
  };
}

export default function reducer(state = initialState, action) {
  console.log("hit reducer", action.payload);
  switch (action.type) {
    case `${GET_USER}_PENDING`:
      return {
        ...state,
        loggedIn: false
      };
    case `${GET_USER}_FULFILLED`:
      return {
        ...state,
        loggedIn: true,
        user: action.payload.data
      };
    case `${GET_USER}_REJECTED`:
      return {
        ...state,
        loggedIn: false,
        user: {}
      };
  }
  return state;
}
