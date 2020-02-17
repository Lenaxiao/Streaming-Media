import {
  EDIT_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  CREATE_STREAM,
  DELETE_STREAM
} from "../actions/types";
import _ from "lodash";

export const streamReducers = (state = {}, action) => {
  // DO NOT change original state, return a new state instead.
  switch (action.type) {
    case EDIT_STREAM:
      // const newState = {...state};
      // newState[action.payload.id] = action.payload;
      // return newState;

      // equivalent:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_STREAMS:
      // remind: payload in this case is an array of object, we need to convert to an object. [{}] => {{}}
      return action.payload.reduce(
        (acc, stream) => ({ ...acc, [stream.id]: stream }),
        {}
      );
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
