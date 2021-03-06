const CREATE_ARTICLE_MARK = 'marks/CREATE_ARTICLE_MARK';
const GET_ALL_READS = 'marks/GET_ALL_READS';
const DELETE_ARTICLE_MARK = 'marks/DELETE_ARTICLE_MARK';

const createArticleMark = value => ({ type: CREATE_ARTICLE_MARK, value });
const getAllReads = value => ({ type: GET_ALL_READS, value });
const deleteArticleMark = () => ({ type: DELETE_ARTICLE_MARK });

const dispatchArticleMark = (articleAndUser) => {
  const userId = articleAndUser.userId;
  const article = articleAndUser.article;
  return async (dispatch) => {
    const res = await fetch(`/api/news/mark`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...article, userId }),
    });
    if (res.ok) {
      const { article } = await res.json();
      dispatch(createArticleMark({ article }));
    }
  }
}

const dispatchAllReads = (userId) => {
  return async (dispatch) => {
    const res = await fetch(`/api/news/mark`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    if (res.ok) {
      const { articles } = await res.json();
      dispatch(getAllReads({ articles }));
    }
  }
}

const dispatchDeleteArticleMark = (articleAndUrl) => {
  const userId = articleAndUrl.userId;
  const url = articleAndUrl.url;
  return async (dispatch) => {
    const res = await fetch(`/api/news/mark`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, userId }),
    });
    if (res.ok) {
      dispatch(deleteArticleMark());
      dispatch(dispatchAllReads(userId));
    }
  }
}


export const thunks = {
  dispatchArticleMark,
  dispatchAllReads,
  dispatchDeleteArticleMark
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case CREATE_ARTICLE_MARK:
      return {
        ...state,
        article: action.value
      }
    case GET_ALL_READS:
      return {
        ...state,
        reads: action.value
      }
    case DELETE_ARTICLE_MARK:
      return {
        ...state,
      }
    default:
      return state;
  }
}
