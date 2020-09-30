import React, { useEffect, useState } from 'react';


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
  return (
    <>
      <h2>
        {props.title}
      </h2>
    </>
  )
}

export default TopHeadlines => {
  const [news, setNews] = useState(null);
  // if (news === null) setNews(async () => await getTopHeadlines());
  // if (!news) return null;
  // console.log("News:", news);
  // console.log("News array:", Object.values(news));
  let newsComponents;
  useEffect(() => {
    (async () => {
      const data = await fetch('/api/news/');
      if (data.ok) {
        const { topHeadlines } = await data.json();
        const articles = topHeadlines.articles;
        console.log('getting top headlines...', articles);
        setNews(articles);
      }
    })()
    // const test = getTopHeadlines()
    // console.log(test)
    // setNews(test)
    // eslint-disable-next-line
  }, []);
  console.log(news)
  if (!news) return null;
  newsComponents = Object.values(news).map((article) => <ArticleCard key={article.url} title={article.title} />)
  // const news = { id: 5, email: "johnpatrickanders@gmail.com", iat: 1601475262, exp: 1601475866 }
  // console.log(newsComponents);
  // useEffect(() => {

  // }, [goodNews]);

  return <div>
    <h2>NEWS:</h2>
    {newsComponents}
  </div>
}
