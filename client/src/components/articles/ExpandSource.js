import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ArticleList from './GridList';
import { thunks } from '../../store/news';

export default function ({ match }) {
  const sourceId = match.params.sourceId;
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(thunks.dispatchArticlesBySource(sourceId));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const articlesBySource = useSelector(state => state.news.articlesBySource);

  if (!articlesBySource) return null;
  const setImgUrls = async () => {
    for (let i = 0; i < articlesBySource.articles.length; i++) {
      let article = articlesBySource.articles[i];
      let img = article.urlToImage;
      article.img = img;
    }
  }
  setImgUrls();


  return (
    <ArticleList articles={articlesBySource.articles} subTitle={`Showing Articles from: ${sourceId}`}>

    </ArticleList >
  )
}
