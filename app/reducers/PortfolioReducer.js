import {
    GET_PORTFOLIOS_SUCCESS,
    GET_PORTFOLIOS_FAIL,
  } from "../actions/types";
  
  const initialState = {
    data: [],
    portfolio: '',
    dataFetched: false,
    isFetching: true,
    isDone: false,
    error: false
  };
  
  export default function PortfolioReducer(state = initialState, action) {
    switch (action.type) {
      case GET_PORTFOLIOS_SUCCESS:
        console.log("actionpayload " + JSON.stringify(action));
        return {
          ...state,
          isFetching: false,
          data: action.payload,
          portfolio: action.portfolio
        };
      case GET_PORTFOLIOS_FAIL:
        return {
          ...state,
          isFetching: false,
          error: true
        };
      default:
        return state;
    }
  }
  