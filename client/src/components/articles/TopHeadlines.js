import React, { useEffect, useState } from 'react';


const getTopHeadlines = async () => {
  const data = await fetch('/api/news/');
  if (data.ok) {
    const { topHeadlines } = await data.json();
    const articles = topHeadlines.articles;
    console.log(articles);
  }
}

const ArticleCard = (props) => {
  return (
    <>
      <h2>
        {props.title}
      </h2>
    </>
  )
}

export default TopHeadlines => {
  // const [news, setNews] = useState({});

  // useEffect(() => {

  // })

  const newsObj = getTopHeadlines();
  if (!newsObj) return null;
  const newsArr = Object.values(newsObj);
  console.log(typeof newsArr)
  const newsComponents = newsArr.map((article) => <ArticleCard key={article.url} title={article.title} />)
  return <div>
    <h2>NEWS!</h2>
    {newsComponents}
  </div>
}
