const GET_TOP_HEADLINES = 'news/GET_TOP_HEADLINES';
const UPDATE_SEARCH_STRING = 'news/UPDATE_SEARCH_QUERY';
const GET_ARTICLE_CONTENT = 'news/GET_ARTICLE_CONTENT';
const GET_SOURCES = 'news/GET_SOURCES';
const GET_ARTICLES_BY_SOURCE = 'news/GET_ARTICLES_BY_SOURCE';

const updateTopHeadlinesValue = value => ({ type: GET_TOP_HEADLINES, value });
const updateSearchString = value => ({ type: UPDATE_SEARCH_STRING, value });
const updateArticleContent = value => ({ type: GET_ARTICLE_CONTENT, value });
const getSources = value => ({ type: GET_SOURCES, value });
const getArticlesBySource = value => ({ type: GET_ARTICLES_BY_SOURCE, value });

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

const getArticleContent = (article) => {
  console.log('Storing content...');
  return (dispatch) => {
    dispatch(updateArticleContent({ article }))
  }
}

const dispatchGetSources = () => {
  return async (dispatch) => {
    const res = await fetch('/api/news/sources');
    if (res.ok) {
      const { sources: { sources } } = await res.json();
      console.log('Your sources:', sources);
      dispatch(getSources({ ...sources }));
    }
  }
}

const dispatchArticlesBySource = (sourceId) => {
  console.log(sourceId)
  return async (dispatch) => {
    const res = await fetch(`/api/news/sources`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sourceId }),
    }
    );
    if (res.ok) {
      const { articles } = await res.json();
      console.log('getting articles by source...', articles);
      dispatch(getArticlesBySource({ articles }));
    }
  }
}


export const actions = {
  updateSearchString
}

export const thunks = {
  getTopHeadlines,
  dispatchUpdateSearchQuery,
  fetchSearchQuery,
  getArticleContent,
  dispatchGetSources,
  dispatchArticlesBySource
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
    case GET_ARTICLE_CONTENT:
      return {
        ...state,
        pageContent: action.value
      }
    case GET_SOURCES:
      return {
        ...state,
        sources: action.value
      }
    case GET_ARTICLES_BY_SOURCE:
      return {
        ...state,
        articlesBySource: action.value
      }
    default:
      return state;
  }
}
