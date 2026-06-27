const authenticateToken = require("../middleware/authenticateToken")
const { Sessions } = require("../models")

const router = require("express").Router()

router.delete('/', authenticateToken, async (req, res, next) => {
	try {
		await Sessions.destroy({ where: { userToken: req.token } })
		res.status(204).end()
	} catch (err) {
		next(err)
	}
})

module.exports = router