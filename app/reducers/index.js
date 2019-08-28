import { combineReducers } from 'redux';
import CryptoReducer from './CryptoReducer';
import CoinHistoryReducer from './CoinHistoryReducer';
import SortReducer from './SortReducer';
import GlobalDataReducer from './GlobalDataReducer';
import SqlReducer from './SqlReducer';
import PortfolioReducer from './PortfolioReducer';

const rootReducer = combineReducers({
  crypto: CryptoReducer,
  coinHistory: CoinHistoryReducer,
  sort: SortReducer,
  global: GlobalDataReducer,
  PortfolioReducer: PortfolioReducer,
  SqlReducer: SqlReducer,
});

export default rootReducer;
