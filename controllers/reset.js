const router = require("express").Router()

const { Blog, User } = require("../models")

router.post('/', async (req, res, next) => {
    try {
        await Blog.destroy({
        where: {},
        truncate: true,
        cascade: true,
        restartIdentity: true,
        })

        await User.destroy({
        where: {},
        truncate: true,
        cascade: true,
        restartIdentity: true,
        })
        res.status(204).end()
    } catch (err) {
        next(err)
    }
})

module.exports = router