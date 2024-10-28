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
    unknownEndpoint,
    checkCredentials
} = require('./config/middleware')

const loginRouter = require('./routes/Login')
const userRouter = require('./routes/User')
const taskRouter = require('./routes/Tasks')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(requestLogger)

app.get('/', (_req, res) => res.send('Hello World'))
app.use('/api/login', loginRouter)
app.use('/api/user', userRouter)

app.use(checkCredentials)
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