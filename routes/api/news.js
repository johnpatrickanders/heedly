const dotenv = require('dotenv');
dotenv.config();
const { asyncHandler } = require('../utils/utils');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.API_KEY);
const express = require('express');
const newsRouter = express.Router();
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them

newsRouter.get('/', asyncHandler(async (req, res) => {
  const topHeadlines = await newsapi.v2.everything({
    q: 'bitcoin',
    sources: 'bbc-news,the-verge',
    domains: 'bbc.co.uk, techcrunch.com',
    from: '2020-09-01',
    to: '2020-09-12',
    language: 'en',
    sortBy: 'relevancy',
    // page: 2
  })
  res.json({ topHeadlines });
}))





// To query /v2/everything
// You must include at least one q, source, or domain
// // To query sources
// // All options are optional
// newsapi.v2.sources({
//   category: 'technology',
//   language: 'en',
//   country: 'us'
// }).then(response => {
//   console.log(response);
//   /*
//     {
//       status: "ok",
//       sources: [...]
//     }
//   */
// });
module.exports = newsRouter;
