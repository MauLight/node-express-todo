const taskRouter = require('express').Router()
const { getAllTasks, postTask, updateTask, deleteTask } = require('../controllers/Tasks')

taskRouter.route('/')
    .post(getAllTasks)

taskRouter.route('/new')
    .post(postTask)

taskRouter.route('./:id')
    .put(updateTask)
    .delete(deleteTask)

module.exports = taskRouter