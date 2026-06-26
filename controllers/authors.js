const router = require('express').Router()
const { fn, col } = require('sequelize');

const { Blog } = require('../models/index')

router.get('/', async (req, res, next) => {
  try{
    const authors = await Blog.findAll({
      attributes: [
        'author',
        [fn('COUNT', col('id')), 'blogs'],
        [fn('SUM', col('likes')), 'likes'],
      ],
      group: ['author'],
      order: [['likes', 'DESC']],
    });

    res.json(authors)
  } catch (err) {
    next(err)
  }
})

module.exports = router