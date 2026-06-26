require('dotenv').config()

module.exports = {
  DATABASE_URL: process.env.TESTING = true ? process.env.TEST_DATABASE_URL : this.process.env.DATABASE_URL,
  PORT: process.env.PORT || 3001,
  SECRET: process.env.SECRET || process.env.JSON_WEBTOKEN_SECRET,
}