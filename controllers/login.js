const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const { Sessions, User } = require('../models')

router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  if (!user) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const passwordCorrect = await bcryptjs.compare(body.password, user.passwordHash)

  if (!passwordCorrect) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  if (user.disabled) {
    return response.status(401).json({
      error: 'Account disabled, please contact admin'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  await Sessions.create({ userId: user.id, userToken: token })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router