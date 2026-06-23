const router = require('express').Router()

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

const errorHandler = (err, req, res, next) => {
    console.error(err.message)

    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
            error: err.errors.map(e => e.message)
        })
    }
    
    res.status(500).json({
        error: err.message || 'Internal Server Error'
    })
}

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

router.post('/', async (req, res) => {
    try {
        const blog = await Blog.create({ ...req.body })
        res.json(blog)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', blogFinder, async (req, res) => {
    try {
        await req.blog.destroy()
        res.status(204).end()
    } catch (err) {
        next(err)
    }
})

router.put('/:id', blogFinder, async (req, res) => {
    try{
        req.blog.likes = req.body.likes
        await req.blog.save()
        res.status(200).json(req.blog)
    } catch (err) {
        next(err)
    }
})

router.use(errorHandler)

module.exports = router