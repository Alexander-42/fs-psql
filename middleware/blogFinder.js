const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
    try {
        req.blog = await Blog.findByPk(req.params.id)
        if (!req.blog) {
            return res.status(404).end()
        }

        next()
    } catch (err) {
        next(err)
    }
}

module.exports = blogFinder