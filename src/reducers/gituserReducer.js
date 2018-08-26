import { FETCH_REPOS, FETCH_USER, SEARCH_ITEMS } from '../actions/types';

const initialState = {
  user:{},
  repos: [],
  allrepos: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_USER:
    console.log('fetch user reducer');
    console.log({...state,user:action.payload});
    return {
      ...state,
      user:action.payload
    }
    case FETCH_REPOS:
    console.log('fetch repos reducer');
    console.log({...state,repos:action.payload});
      return {
        ...state,
        repos:action.payload,
        allrepos: action.payload
      }
      case SEARCH_ITEMS:
      return{
        ...state,
        repos: state.allrepos.filter((item) => new RegExp(action.payload, "i").exec(item.name))
      }
    default:
      return state;
  }
}