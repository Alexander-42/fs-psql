const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readingList')
const Sessions = require('./sessions')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingList, as: 'users_marked' })

User.hasMany(Sessions)
Sessions.belongsTo(User)

module.exports = {
  Blog, User, ReadingList, Sessions
}