import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { thunks } from '../../store/news';
import TitleBarGridlist from './GridList';


export default TopHeadlines => {
  let location = useLocation();
  const dispatch = useDispatch();
  let newsComponents;
  const topNews = location.pathname === '/search' ? useSelector(state => state.news.searchResults) : useSelector(state => state.news.articles);
  console.log(location);
  useEffect(() => {
    (async () => {
      dispatch(await thunks.getTopHeadlines());
    })();
  }, [location]);
  if (!topNews) return null;

  // if (location.pathname === '/search') {
  //   topNews = useSelector(state => state.news.searchResults);
  // }

  const setImgUrls = async () => {
    for (let i = 0; i < topNews.length; i++) {
      let article = topNews[i];
      let img = article.urlToImage;
      article.img = img;
    }
  }
  setImgUrls();

  newsComponents = (
    <TitleBarGridlist articles={topNews} subTitle={"Top News For Today:"}>

    </TitleBarGridlist>
  )

  return <div>
    {newsComponents}
  </div>
}
