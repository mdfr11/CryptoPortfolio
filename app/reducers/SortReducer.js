import {
    SORT_COINS,
} from '../actions/types';

const initialState = {
    sortBy: 'SORTED_BY_RANK_ASC',
    searchQuery: ''
  };

export default function(state = initialState, action) {
    switch (action.type) {
        case SORT_COINS:
            return {
                sortBy: action.payload
        }
        case 'SET_SEARCH_QUERY':
            return {
                searchQuery: action.payload
        };
    }
    return state
}