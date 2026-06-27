const jwt = require('jsonwebtoken')

const { SECRET } = require('../util/config')
const { Sessions, User } = require('../models')

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json( {error: "Not authenticated"} )
    }
    try {
        const user = jwt.verify(token, SECRET)

        const currSession = await Sessions.findOne({ where: { userToken: token } })

        if (!currSession) {
            return res.status(401).json({
                error: 'session expired or revoked'
            })
        }

        const dbUser = await User.findByPk(user.id)
        if (!dbUser || dbUser.disabled) {
            await Sessions.destroy({ where: { userId: user.id } })
            return res.status(401).json({
                error: 'account disabled, contact admin'
            })
        }

        req.token = token
        req.user = user;
        next()
    } catch (err) {
        if (err.name === 'JsonWebTokenError' || err.name == 'TokenExpiredError') {
            return res.status(401).json({ error: "Not authenticated" })
        }
        next(err)
    }
}

module.exports = authenticateToken