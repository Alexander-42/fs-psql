const router = require("express").Router()
const authenticateToken = require("../middleware/authenticateToken")

const { ReadingList, User, Blog } = require("../models")

router.post('/', async (req, res, next) => {
    try {
        const body = req.body

        if (!body.blogId) {
            return res.status(400).json({ error: 'Blog Id missing'})
        }
        if (!body.userId) {
            return res.status(400).json({ error: 'User Id missing'})
        }

        const user = await User.findByPk(body.userId)
        const blog = await Blog.findByPk(body.blogId)

        if (!user) {
            return res.status(404).json({ error: 'User not found'})
        }
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found'})
        }

        const reading = await ReadingList.create({
            ...body,
            read: false
        })
        res.status(200).json({
            id: reading.id,
            user_id: reading.userId,
            blog_id: reading.blogId,
            read: reading.read
        })
    } catch (err) {
        next(err)
    }
})

router.put('/:id', authenticateToken, async (req, res, next) => {
    try {
        const body = req.body
        const user = req.user

        const readingListRow = await ReadingList.findByPk(req.params.id)

        if (!readingListRow) {
            return res.status(404).json({ error: 'reading list entry not found' })
        }

        if (readingListRow.userId !== user.id) {
            return res.status(401).json({ error: 'not authorized' })
        }

        readingListRow.read = body.read
        await readingListRow.save()

        res.json(readingListRow)
        
    } catch (err) {
        next(err)
    }
})

module.exports = router