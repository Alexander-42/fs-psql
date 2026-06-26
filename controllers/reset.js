const router = require("express").Router()

router.post('/', async (req, res, next) => {
  try {
    await sequelize.query(`
      TRUNCATE "Blogs", "Users" RESTART IDENTITY CASCADE;
    `)

    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = router