const jwt = require('jsonwebtoken')

const { SECRET } = require('../util/config')

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json( {error: "Not authenticated"} )
    }

    jwt.verify(token, SECRET, (err, user) => {
        if (err) {
            return res.status(401).json( {error: "Not authenticated"} )
        }

        req.user = user;
        next()
    })
}

module.exports = authenticateToken