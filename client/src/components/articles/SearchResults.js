import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { thunks } from '../../store/news';
import TitleBarGridlist from './GridList';


export default TopHeadlines => {
  let location = useLocation();
  const dispatch = useDispatch();
  // history.push('search');
  let newsComponents;
  const topNews = useSelector(state => state.news.searchResults);
  console.log("TOP NEWS:", topNews);
  console.log(location);
  // useEffect(() => {
  //   (async () => {
  //     dispatch(await thunks.getTopHeadlines());
  //   })();
  // }, []);
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
    <TitleBarGridlist articles={topNews} subTitle={"Top News For Today:"}>

    </TitleBarGridlist>
  )

  return <div>
    {newsComponents}
  </div>
}
