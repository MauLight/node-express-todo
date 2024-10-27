const taskRouter = require('express').Router()
const { getAllTasks, getTasksByUserId, postTask, updateTask, deleteTask } = require('../controllers/Tasks')

taskRouter.route('/')
    .post(getAllTasks)

taskRouter.route('/new')
    .post(postTask)

taskRouter.route('/:id')
    .post(getTasksByUserId)
    .put(updateTask)
    .delete(deleteTask)

module.exports = taskRouter