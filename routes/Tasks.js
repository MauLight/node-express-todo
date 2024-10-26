const taskRouter = require('express').Router()
const { getAllTasks } = require('../controllers/Tasks')

taskRouter.route('/')
    .get(getAllTasks)

module.exports = taskRouter