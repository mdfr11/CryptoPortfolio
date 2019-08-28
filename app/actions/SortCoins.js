import {
    SORT_COINS,
} from './types';

export const sortCoins = (sortBy) => {
    return {
        type: SORT_COINS,
        payload: sortBy
    }
}

export const setSearchQuery = value => ({
    type: 'SET_SEARCH_QUERY',
    payload: value
  });