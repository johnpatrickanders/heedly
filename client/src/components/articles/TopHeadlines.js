import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunks } from '../../store/news';
import TitleBarGridlist from './GridList';


export default TopHeadlines => {
  const location = useLocation();
  const dispatch = useDispatch();
  let newsComponents;
  useEffect(() => {
    (async () => {
      dispatch(await thunks.getTopHeadlines());
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  const topNews = useSelector(state => state.news.articles);
  if (!topNews) return null;

  const setImgUrls = async () => {
    for (let i = 0; i < topNews.length; i++) {
      let article = topNews[i];
      let img = article.urlToImage;
      article.img = img;
    }
  }
  setImgUrls();

  newsComponents = (
    <TitleBarGridlist articles={topNews} subTitle={"Top News For Today"}>

    </TitleBarGridlist>
  )

  return newsComponents
}
