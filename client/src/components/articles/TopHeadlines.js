import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunks } from '../../store/news';
import { TabPanel } from '../layouts/Footer';
import TitleBarGridlist from './GridList';


const ArticleCard = (props) => {
  console.log('AC PropsL', props)
  return (
    <>
      <div value={props.title} index={props.url} children={props.title}>
        {props.title}
      </div>
    </>
  )
}

export default TopHeadlines => {
  const [news, setNews] = useState(null);
  const dispatch = useDispatch();
  let newsComponents;
  const topNews = useSelector(state => state.news).articles;
  // const alreadyFetched = !!topNews;
  // if (alreadyFetched) return;
  // console.log("Top news:", topNews);
  useEffect(() => {
    (async () => {
      dispatch(await thunks.getTopHeadlines());
    })();
    setNews(topNews);
  }, []);
  // console.log(news)
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
    <h2>NEWS:</h2>
    {newsComponents}
  </div>
}
