const taskRouter = require('express').Router()
const { getAllTasks } = require('../apiCalls')

taskRouter.route('/')
    .get(getAllTasks)

module.exports = taskRouter