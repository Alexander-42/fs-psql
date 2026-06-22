require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize');
const { format } = require('sequelize/lib/utils');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres'
});

const main = async () => {
  try {
    await sequelize.authenticate()
    const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })    
    console.log('\nQuery results:')
    console.log('--------------------')
    blogs.forEach(b => {
        const formattedRow = `${b.author ? b.author : 'unknown'}: '${b.title}', ${b.likes} likes`
        console.log(formattedRow)
    })
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()