const { Model, DataTypes } = require('sequelize')
const bcryptjs = require('bcryptjs')

const { sequelize } = require('../util/db')

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'Username must be a valid email address'
      }
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.VIRTUAL,
    allowNull: false
  },
  passwordHash: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'user'
})

User.beforeCreate(async (user) => {
  if (!user.password) {
    throw new Error('Password is required')
  }
  const saltRounds = 10
  user.passwordHash = await bcryptjs.hash(user.password, saltRounds)
})

module.exports = User