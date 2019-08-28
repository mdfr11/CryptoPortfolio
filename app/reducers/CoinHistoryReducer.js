import { COIN_DATA_HISTORICAL, COIN_DATA_HISTORICAL_SUCCESS, COIN_DATA_HISTORICAL_FAIL } from '../actions/types';

const INITIAL_STATE = {
  isFetching: true,
  data: [],
  hasError: false,
  errorMessage: null,
};

const CoinHistoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COIN_DATA_HISTORICAL:
      return Object.assign({}, state, {
        isFetching: true,
        data: [],
        hasError: false,
        errorMessage: null,
      });
    case COIN_DATA_HISTORICAL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
        hasError: false,
        errorMessage: null,
      };
    case COIN_DATA_HISTORICAL_FAIL:
      return {
        ...state,
        isFetching: false,
        data: [],
        hasError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default CoinHistoryReducer;
