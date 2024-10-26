const requestLogger = (req, _res, next) => {
    console.log('Method: ', req.method)
    console.log('Path: ', req.path)
    console.log('Body: ', req.body)
    console.log('---')
    next()
}

const errorHandler = (error, _req, res, _next) => {
    console.error(error.message)
    if (error.message === 'not found') return res.status(404).json({ message: 'Service or resource does not exist' })
    if (error.message === 'internal') return res.status(500).json({ message: 'Internal Server Error' })
    res.status(404).send({ error: error.message })
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'Unknown endpoint' })
}

module.exports = {
    requestLogger,
    errorHandler,
    unknownEndpoint
}