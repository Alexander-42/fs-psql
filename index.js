require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()

app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
})

class Blog extends Model {}
Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog'
})

app.get('/api/blogs', async (req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

app.post('/api/blogs', async (req, res) => {
    try {
        const blog = await Blog.create({ ...req.body })
        res.json(blog)
    } catch (error) {
        return res.status(400).json({ error })
    }
})

app.delete('/api/blogs/:id', async (req, res) => {
    try {
        const blogToDelete = await Blog.findByPk(req.params.id)
        if (blogToDelete) {
            await blogToDelete.destroy()
            res.status(204).end()
        } else {
            res.status(404).end()
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`)
    await Blog.sync()
})