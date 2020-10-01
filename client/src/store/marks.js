// import { useSelector } from 'react-redux';
const CREATE_ARTICLE_MARK = 'marks/CREATE_ARTICLE_MARK';

const createArticleMark = value => ({ type: CREATE_ARTICLE_MARK, value });

// const article = {
//   "url": "https://www.bbc.co.uk/sport/54131955",
//   "content": "Barcelona manager Ronald Koeman has made Liverpool and Egypt forward Mohamed Salah, 28, his top transfer target. (Sunday Express)external-link\r\nManchester United could move for Real Madrid and Wales … [+2218 chars]",
//   "img": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/03A7/production/_114353900_salah.png",
//   "publishedAt": "2020-09-12T21:56:05Z",
//   "title": "Salah is Barca's top target - Sunday's gossip column",
//   "author": "John Anders",
//   "description": "added this late...",
//   "userId": 1,
//   "userHeedId": "https://www.bbc.co.uk/sport/54131955"
// }
const dispatchArticleMark = (article) => {
  const userId = 3;
  const { url,
    content, img, title, author,
    description, publishedAt } = article;
  console.log("I'm trying to dispatch the article:", article)
  return async (dispatch) => {
    const res = await fetch(`/api/news/mark`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...article.article, userId }),
    });
    if (res.ok) {
      const { article } = await res.json();
      console.log('your article is storing:', article);
      dispatch(createArticleMark({ article }));
    }
  }
}

export const thunks = {
  dispatchArticleMark
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case CREATE_ARTICLE_MARK:
      return {
        ...state,
        article: action.value
      }
    default:
      return state;
  }
}
