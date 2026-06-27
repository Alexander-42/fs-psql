const errorHandler = (err, req, res, next) => {
    console.error(err.message)

    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
            error: err.errors.map(e => e.message)
        })
    }

    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
            error: err.errors.map(e => e.message)
        })
    }
    
    res.status(500).json({
        error: err.message || 'Internal Server Error'
    })
}

module.exports = errorHandler