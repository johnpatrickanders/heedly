import { useSelector } from 'react-redux';
const GET_TOP_HEADLINES = 'news/GET_TOP_HEADLINES';

const updateTopHeadlinesValue = value => ({ type: GET_TOP_HEADLINES, value });

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

export const actions = {
  getTopHeadlines
}

export const thunks = {
  getTopHeadlines,
};


export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_TOP_HEADLINES:
      return action.value;
    default:
      return state;
  }
}
