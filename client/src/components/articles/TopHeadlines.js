import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunks } from '../../store/news';
import { TabPanel } from '../layouts/Footer';
import TitleBarGridlist from './GridList';


const getTopHeadlines = async () => {
  const data = await fetch('/api/news/');
  if (data.ok) {
    const { topHeadlines } = await data.json();
    const articles = topHeadlines.articles;
    console.log('getting top headlines...', articles);
    return articles;
  }
}


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
  console.log("Top news:", topNews);
  useEffect(() => {
    (async () => {
      dispatch(await thunks.getTopHeadlines());
    })();
    setNews(topNews);
  }, []);
  console.log(news)
  if (!topNews) return null;
  let key = 0;
  // newsComponents = topNews.map((article) => {
  //   key += 1;
  //   return <ArticleCard key={key} url={article.url} title={article.title} />
  // })

  newsComponents = (
    <TitleBarGridlist articles={topNews}>

    </TitleBarGridlist>
  )

  return <div>
    <h2>NEWS:</h2>
    {newsComponents}
  </div>
}
