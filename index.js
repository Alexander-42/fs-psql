const express = require('express')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const { sequelize } = require('./util/db')

sequelize.sync({ alter: true })

const errorHandler = require('./middleware/errorHandler')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorRouter = require('./controllers/authors')
const resetRouter = require('./controllers/reset')

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorRouter)
app.use('/api/reset', resetRouter)

app.get('/', (req, res, next) => {
    try {
        res.status(200).end()
    } catch (err) {
        next(err)
    }
})

app.use(errorHandler)

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`)
})