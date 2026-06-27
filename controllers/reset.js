const router = require("express").Router()

const { Blog, User, ReadingList, Sessions } = require("../models")

// Only the application's data tables — NOT the umzug `migrations` table,
// which is also registered on the sequelize instance. Using
// sequelize.truncate() would wipe the migration history too.
const models = [ReadingList, Sessions, Blog, User]

router.post('/', async (req, res, next) => {
    try {
        for (const model of models) {
            await model.destroy({
                where: {},
                truncate: true,
                cascade: true,
                restartIdentity: true,
            })
        }
        res.status(204).end()
    } catch (err) {
        next(err)
    }
})

module.exports = router
