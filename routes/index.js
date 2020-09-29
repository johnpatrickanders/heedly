const router = require('express').Router();
const users = require('./api/users');

router.use('/api', users);

router.get('/', (req, res) => {
  console.log('home')
})

module.exports = router;
