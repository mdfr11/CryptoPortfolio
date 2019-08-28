import { SQLite } from "expo-sqlite";
import {
  FETCH_DB_DATA,
  FETCH_DB_DATA_SUCCESS,
  FETCH_DB_DATA_FAIL,
  CREATE_TABLE,
  GET_PORTFOLIOS_SUCCESS,
  GET_PORTFOLIOS_FAIL,
} from "./types";

const db = SQLite.openDatabase("db.db");

export const GetTransactions = (id) => async dispatch => {
  dispatch({ type: FETCH_DB_DATA });
  try {
    db.transaction(tx => {
      tx.executeSql(
        `select name, price, sum(amount) as amount from transactions where portfolioId = ? group by name`,
        [id],
        (_, results) => {
          var len = results.rows.length;
          var rows = [];
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            rows.push(row);
          }
          dispatch({ type: FETCH_DB_DATA_SUCCESS, payload: rows });
        }
      );
    });
    
  } catch (error) {
    dispatch({ type: FETCH_DB_DATA_FAIL, payload: error });
  }
};

export const CreateTable = () => async dispatch => {
  dispatch({ type: CREATE_TABLE });
  db.transaction(tx => {
    tx.executeSql(
      'create table if not exists portfoliosqq (portfolioId integer primary key not null, namePortfolio text);'
    );
    tx.executeSql(
      'create table if not exists transactions (id integer primary key not null, name text, amount int, price int, portfolioId int, FOREIGN KEY(portfolioId) REFERENCES portfoliosqq(portfolioId));'
    );
  });
};

export const GetPortfolios = (portfolio) => async dispatch => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        `select * from portfoliosqq`,
        [],
        (_, results) => {
          var len = results.rows.length;
          var portfolios = [];
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            portfolios.push(row);
          }
          dispatch({ type: GET_PORTFOLIOS_SUCCESS, payload: portfolios, portfolio: portfolio });
        }
      );
    });
    
  } catch (error) {
    dispatch({ type: GET_PORTFOLIOS_FAIL, payload: error });
  }
};