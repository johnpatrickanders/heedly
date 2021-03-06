const { asyncHandler } = require('../utils/utils');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.API_KEY);
const express = require('express');
const router = express.Router();
const { User, UserHeed, UserMark } = require('../../db/models');
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them

router.get('/', asyncHandler(async (req, res) => {
  const topHeadlines = await newsapi.v2.topHeadlines({
    country: 'us',
    language: 'en',
    sortBy: 'relevancy',
    pageSize: 20,
    // page: 20
  })
  res.json({ topHeadlines });
}))

router.put('/search', asyncHandler(async (req, res) => {
  const searchString = req.body.searchString.search;
  const topHeadlines = await newsapi.v2.everything({
    q: `${searchString}`,
    language: 'en',
    sortBy: 'relevancy',
    pageSize: 20,
    // page: 20
  })
  res.json({ topHeadlines });
}))

router.get('/sources', asyncHandler(async (req, res) => {
  // const source = req.body.source;
  const sources = await newsapi.v2.sources({
    // q: `${source}`,
    language: 'en',
    sortBy: 'relevancy',
    pageSize: 2,
    // page: 20
  })
  res.json({ sources });
}))

router.put('/sources', asyncHandler(async (req, res) => {
  const { sourceId } = req.body;
  const articlesBySource = await newsapi.v2.topHeadlines({
    sources: `${sourceId}`,
    language: 'en',
    sortBy: 'relevancy',
    pageSize: 20,
    // page: 20
  })
  res.json({ ...articlesBySource });
}))

router.post('/mark', asyncHandler(async (req, res) => {
  const { userId, url,
    content, img, title, author,
    description, publishedAt } = req.body;


  const alreadyInDb = await UserHeed.findByPk(url);
  if (!alreadyInDb) {
    await UserHeed.create({
      url,
      content,
      img,
      title,
      author,
      description,
      publishedAt,
      description
    });
    const userMark = await UserMark.create({
      userId,
      userHeedId: url
    })
    return;
  }

  const alreadyMarked = await UserMark.findOne({
    where: {
      userId,
      userHeedId: url
    }
  })
  if (!alreadyMarked) {
    await UserMark.create({
      userId,
      userHeedId: url
    });
    await userMark.save()
  }

  res.json({
    article: {
      url,
      content, img, title, author,
      description, publishedAt
    }
  });
}))


router.put('/mark', asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const articles = await getReadsById(userId);
  const sortedByMostRecent = articles.reverse();
  res.json({ articles: sortedByMostRecent })
}))

router.delete('/mark', asyncHandler(async (req, res) => {
  const { userId, url } = req.body;
  await UserMark.destroy({
    where: {
      userId,
      userHeedId: url
    }
  })
  res.json({ message: 'the article was removed from your reads' })
}))

async function getReadsById(userId) {
  return await UserHeed.findAll({
    include: [{
      model: User,
      required: true,
      where: { id: userId },
      attributes: [],
    }],
  });
}




// To query /v2/everything
// You must include at least one q, source, or domain
// // To query sources
// // All options are optional
// newsapi.v2.sources({
//   category: 'technology',
//   language: 'en',
//   country: 'us'
// }).then(response => {
//   /*
//     {
//       status: "ok",
//       sources: [...]
//     }
//   */
// });
module.exports = router;
