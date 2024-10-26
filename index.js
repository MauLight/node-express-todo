require('dotenv').config()
require('./models/associations')

const express = require('express')
const app = express()
const { sequelize } = require('./connection')
const port = process.env.PORT

const bodyParser = require('body-parser')
const cors = require('cors')

const {
    requestLogger,
    errorHandler,
    unknownEndpoint
} = require('./config/middleware')

const taskRouter = require('./routes/Tasks')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(requestLogger)

app.get('/', (req, res) => res.send('Hello World'))
app.use('/api/tasks', taskRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection succesful')
        return sequelize.sync()
    })
    .then(() => {
        console.log('Sync models')
        app.listen(port, () => console.log(`Endpoints available at http://localhost:${port}`))
    })
    .catch(error => console.log('Connection failed.', error))