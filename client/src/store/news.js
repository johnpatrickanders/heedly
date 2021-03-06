const GET_TOP_HEADLINES = 'news/GET_TOP_HEADLINES';
const UPDATE_SEARCH_RESULTS = 'news/UPDATE_SEARCH_RESULTS';
const UPDATE_SEARCH_STRING = 'news/UPDATE_SEARCH_QUERY';
const GET_ARTICLE_CONTENT = 'news/GET_ARTICLE_CONTENT';
const GET_SOURCES = 'news/GET_SOURCES';
const GET_ARTICLES_BY_SOURCE = 'news/GET_ARTICLES_BY_SOURCE';

const updateTopHeadlinesValue = value => ({ type: GET_TOP_HEADLINES, value });
const updateSearchResults = value => ({ type: UPDATE_SEARCH_RESULTS, value });
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
      dispatch(updateSearchResults({ searchResults: articles }));
      // window.location.pathname = '/search';
    }
  }
}

const getArticleContent = (article) => {
  return (dispatch) => {
    dispatch(updateArticleContent({ article }))
  }
}

const dispatchGetSources = () => {
  return async (dispatch) => {
    const res = await fetch('/api/news/sources');
    if (res.ok) {
      const { sources: { sources } } = await res.json();
      dispatch(getSources({ ...sources }));
    }
  }
}

const dispatchArticlesBySource = (sourceId) => {
  return async (dispatch) => {
    const res = await fetch(`/api/news/sources`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sourceId }),
    }
    );
    if (res.ok) {
      const { articles } = await res.json();
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
      return {
        ...state,
        ...action.value
      }
    case UPDATE_SEARCH_RESULTS:
      return {
        ...state,
        ...action.value
      }
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
