const router = require('express').Router()
const { Blog, User } = require('../models')

const { Op } = require("sequelize")

const { userFinderById, userFinderByUsername } = require('../middleware/userFinder')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'username', 'name'],
    include:[
      {
        model: Blog,
        attributes: ['id', 'author', 'title', 'url', 'likes'],
      },
    ] 
  })
  res.json(users)
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create({ ...req.body, passwordHash: '' })
    const userToReturn = {
      "id": user.id,
      "username": user.username,
      "name": user.name,
      "updatedAt": user.updatedAt,
      "createdAt": user.createdAt
    }
    res.json(userToReturn)
  } catch(err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  const {read} = req.query

  const where = read 
    ? {
      read: {[Op.eq]:[read]} 
    }
    : {}

  const user = await User.findByPk(req.params.id, {
    attributes: ['name', 'username'],
      include: [{
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['userId', 'createdAt', 'updatedAt']},
        through: {
          where,
          as: 'reading_list',
          attributes: ['read', 'id']
        }
      }
    ]
  })
  res.json(user)
})

router.put('/:username', userFinderByUsername, async (req, res, next) => {
  try {
    const reqUser = req.fullUser
    const body = req.body
    reqUser.username = body.username
    await reqUser.save()
    const userToReturn = {
      "id": reqUser.id,
      "username": body.username,
      "name": reqUser.name,
      "updatedAt": reqUser.updatedAt,
      "createdAt": reqUser.createdAt
    }
    res.json(userToReturn)
  } catch (err) {
    next(err)
  }
})

module.exports = router