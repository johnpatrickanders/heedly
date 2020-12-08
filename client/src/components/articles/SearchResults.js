import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { thunks } from '../../store/news';
import TitleBarGridlist from './GridList';


export default TopHeadlines => {
  let location = useLocation();
  const dispatch = useDispatch();
  let newsComponents;
  const searchString = useSelector(state => state.news.searchString);
  useEffect(() => {
    (async () => {
      dispatch(await thunks.fetchSearchQuery(searchString));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  const searchResults = useSelector(state => state.news.searchResults);
  if (!searchResults) return null;

  const setImgUrls = async () => {
    for (let i = 0; i < searchResults.length; i++) {
      let article = searchResults[i];
      let img = article.urlToImage;
      article.img = img;
    }
  }
  setImgUrls();

  newsComponents = (
    <TitleBarGridlist articles={searchResults} subTitle={`Showing results...`}>

    </TitleBarGridlist>
  )

  return <div>
    {newsComponents}
  </div>
}
