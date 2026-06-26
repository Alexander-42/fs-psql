const router = require('express').Router()
const jwt = require('jsonwebtoken')

const { Blog } = require('../models')

const blogFinder = require('../middleware/blogFinder')
const authenticateToken = require('../middleware/authenticateToken')

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

router.post('/', async (req, res, next) => {
    try {
        const blog = await Blog.create({ ...req.body })
        res.json(blog)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', authenticateToken, blogFinder, async (req, res, next) => {
    try {
        const userOwnsBlog = req.user.id === req.blog.userId
        if (!userOwnsBlog){
            return res.status(403).json({ error: "Permission denied"})
        }
        await req.blog.destroy()
        res.status(204).end()
    } catch (err) {
        next(err)
    }
})

router.put('/:id', blogFinder, async (req, res, next) => {
    try{
        req.blog.likes = req.body.likes
        await req.blog.save()
        res.status(200).json(req.blog)
    } catch (err) {
        next(err)
    }
})

module.exports = router