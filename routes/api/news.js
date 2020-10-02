const dotenv = require('dotenv');
dotenv.config();
const { asyncHandler } = require('../utils/utils');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.API_KEY);
const express = require('express');
const newsRouter = express.Router();
const { User, UserHeed, UserMark } = require('../../db/models');
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them

newsRouter.get('/', asyncHandler(async (req, res) => {
  const topHeadlines = await newsapi.v2.topHeadlines({
    country: 'us',
    language: 'en',
    sortBy: 'relevancy',
    pageSize: 20,
    // page: 20
  })
  res.json({ topHeadlines });
}))

newsRouter.put('/search', asyncHandler(async (req, res) => {
  const searchString = req.body.searchString.search;
  // console.log(req, searchString)
  const topHeadlines = await newsapi.v2.everything({
    q: `${searchString}`,
    language: 'en',
    sortBy: 'relevancy',
    pageSize: 20,
    // page: 20
  })
  res.json({ topHeadlines });
}))

newsRouter.get('/sources', asyncHandler(async (req, res) => {
  // const source = req.body.source;
  // console.log(req, source)
  const sources = await newsapi.v2.sources({
    // q: `${source}`,
    language: 'en',
    sortBy: 'relevancy',
    pageSize: 2,
    // page: 20
  })
  res.json({ sources });
}))

newsRouter.put('/sources', asyncHandler(async (req, res) => {
  const { sourceId } = req.body;
  console.log(sourceId)
  const articlesBySource = await newsapi.v2.topHeadlines({
    sources: `${sourceId}`,
    language: 'en',
    sortBy: 'relevancy',
    pageSize: 20,
    // page: 20
  })
  res.json({ ...articlesBySource });
}))

newsRouter.post('/mark', asyncHandler(async (req, res) => {
  const { userId, url,
    content, img, title, author,
    description, publishedAt } = req.body;


  const alreadyInDb = await UserHeed.findByPk(url);
  console.log("Already in db:", !!alreadyInDb);
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
    // console.log('userId:', userId);
    // console.log('url:', url);
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
  console.log("Already marked:", !!alreadyMarked)
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


newsRouter.put('/mark', asyncHandler(async (req, res) => {
  const { userId } = req.body;
  console.log(userId)
  const articles = await getReadsById(userId);
  res.json({ articles })
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

async function one(id) {
  const pokemon = await Pokemon.findByPk(id, {
    include: ['items', 'player']
  });

  return {
    attack: pokemon.attack,
    defense: pokemon.defense,
    id: pokemon.id,
    imageUrl: pokemon.imageUrl,
    name: pokemon.name,
    type: pokemon.type,
    moves: [...pokemon.moves],
    items: pokemon.items.map(item => {
      return {
        name: item.name,
        price: item.price,
        happiness: item.happiness,
        imageUrl: item.imageUrl,
      };
    }),
    owner: {
      id: pokemon.player.id,
      name: pokemon.player.name,
    },
  };
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
//   console.log(response);
//   /*
//     {
//       status: "ok",
//       sources: [...]
//     }
//   */
// });
module.exports = newsRouter;
