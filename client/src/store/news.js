import { useSelector } from 'react-redux';
const GET_TOP_HEADLINES = 'news/GET_TOP_HEADLINES';
const UPDATE_SEARCH_STRING = 'news/UPDATE_SEARCH_QUERY';
const GET_SEARCH_QUERY = 'news/GET_SEARCH_QUERY';

const updateTopHeadlinesValue = value => ({ type: GET_TOP_HEADLINES, value });
const updateSearchString = value => ({ type: UPDATE_SEARCH_STRING, value })

const getTopHeadlines = () => {
  return async (dispatch) => {
    const res = await fetch('/api/news/');
    if (res.ok) {
      const { topHeadlines } = await res.json();
      const articles = topHeadlines.articles;
      console.log('getting top headlines in store...', articles);
      dispatch(updateTopHeadlinesValue({ articles }));
    }
  }
}

const dispatchUpdateSearchQuery = (search) => {
  return async (dispatch) => {
    dispatch(updateSearchString({ search }))
  }
}



const fetchSearchQuery = (searchString) => {
  console.log(searchString)
  return async (dispatch) => {
    const res = await fetch(`/api/news/search`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ searchString }),
    }
    );
    if (res.ok) {
      const { topHeadlines } = await res.json();
      const articles = topHeadlines.articles;
      console.log('getting search results in store...', articles);
      dispatch(updateTopHeadlinesValue({ articles }));
    }
  }
}



export const actions = {
  updateSearchString
}

export const thunks = {
  getTopHeadlines,
  dispatchUpdateSearchQuery,
  fetchSearchQuery
};


export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_TOP_HEADLINES:
      return action.value;
    case UPDATE_SEARCH_STRING:
      return {
        ...state,
        searchString: action.value
      }
    default:
      return state;
  }
}
