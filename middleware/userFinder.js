const { User } = require('../models')

const userFinderById = async (req, res, next) => {
    try {
        req.fullUser = await User.findByPk(req.params.id)
        if (!req.fullUser) {
            return res.status(404).end()
        }

        next()
    } catch (err) {
        next(err)
    }
}

const userFinderByUsername = async (req, res, next) => {
    try {
        req.fullUser = await User.findOne({
            where: {
                username: req.params.username
            }
        })
        if (!req.fullUser) {
            return res.status(404).json({ error: 'user not found by middleware'})
        }

        next()
    } catch (err) {
        next(err)
    }
}

module.exports = { userFinderById, userFinderByUsername }