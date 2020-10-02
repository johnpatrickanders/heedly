import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ArticleList from './GridList';
import { thunks } from '../../store/news';

export default function ({ match }) {
  const sourceId = match.params.sourceId;
  console.log("Source:", sourceId)

  const dispatch = useDispatch();

  // const userId = useSelector(state => state.auth.id);


  useEffect(() => {
    (async () => {
      dispatch(thunks.dispatchArticlesBySource(sourceId));
    })();
  }, []);



  const articlesBySource = useSelector(state => state.news.articlesBySource);

  if (!articlesBySource) return null;
  console.log(articlesBySource.articles)

  // const stockImg = "https://cdn.pixabay.com/photo/2016/11/06/17/17/north-america-1803504_960_720.jpg"
  const setImgUrls = async () => {
    for (let i = 0; i < articlesBySource.articles.length; i++) {
      let article = articlesBySource.articles[i];
      let img = article.urlToImage;
      // console.log(img)
      article.img = img;
      // if (article.img === null) article.img = stockImg;
    }
  }
  setImgUrls();


  return (
    <ArticleList articles={articlesBySource.articles} subTitle={`Showing Articles from: ${sourceId}`}>

    </ArticleList >
  )
}
