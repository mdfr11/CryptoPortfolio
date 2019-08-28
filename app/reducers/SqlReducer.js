import {
  FETCH_DB_DATA,
  FETCH_DB_DATA_SUCCESS,
  FETCH_DB_DATA_FAIL,
} from "../actions/types";

const initialState = {
  data: [],
  dataFetched: false,
  isFetching: true,
  isDone: false,
  error: false
};

export default function SqlReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DB_DATA:
      return {
        ...state,
        isFetching: true,
        data: [],
        error: false,
      };
    case FETCH_DB_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload
      };
    case FETCH_DB_DATA_FAIL:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    default:
      return state;
  }
}
