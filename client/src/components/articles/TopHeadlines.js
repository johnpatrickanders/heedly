import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunks } from '../../store/news';
import TitleBarGridlist from './GridList';


export default TopHeadlines => {

  const dispatch = useDispatch();
  let newsComponents;
  const topNews = useSelector(state => state.news).articles;
  useEffect(() => {
    (async () => {
      dispatch(await thunks.getTopHeadlines());
    })();
  }, []);
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
