const loginRouter = require('express').Router()
const { loginUser } = require('../controllers/Login')

loginRouter.route('/')
    .post(loginUser)

module.exports = loginRouter