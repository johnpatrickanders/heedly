const router = require('express').Router();
const users = require('./api/users');
const news = require('./api/news')

router.use('/api', users);
router.use('/api/news', news);

router.get('/', (req, res) => {
})

module.exports = router;
