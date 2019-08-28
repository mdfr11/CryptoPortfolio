import axios from 'axios';
import {
  FETCH_COIN_DATA,
  FETCH_COIN_DATA_SUCCESS,
  FETCH_COIN_DATA_FAIL,
  COIN_DATA_HISTORICAL,
  COIN_DATA_HISTORICAL_SUCCESS,
  COIN_DATA_HISTORICAL_FAIL,
  FETCH_GLOBAL_DATA,
  FETCH_GLOBAL_DATA_SUCCESS,
  FETCH_GLOBAL_DATA_FAIL
} from './types';

export const FetchCoinData = () => async (dispatch) => {
  dispatch({ type: FETCH_COIN_DATA });
  try {
    const result = await axios.get(`https://api.coinpaprika.com/v1/tickers`);
    dispatch({ type: FETCH_COIN_DATA_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: FETCH_COIN_DATA_FAIL, payload: error });
  }
};

export const CoinDataHistorical = (time) => async (dispatch) => {
  dispatch({ type: COIN_DATA_HISTORICAL });
  try {
    const result = await axios.get("https://api.coinpaprika.com/v1/tickers/"+ time.coin +"/historical?start="+ time.start +"&end="+ time.end +"&interval="+ time.interval);
    dispatch({ type: COIN_DATA_HISTORICAL_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: COIN_DATA_HISTORICAL_FAIL, payload: error });
  }
};

export const FetchGlobalData = () => async (dispatch) => {
  dispatch({ type: FETCH_GLOBAL_DATA });
  try {
    const result = await axios.get(`https://api.coinpaprika.com/v1/global`);
    dispatch({ type: FETCH_GLOBAL_DATA_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: FETCH_GLOBAL_DATA_FAIL, payload: error });
  }
};