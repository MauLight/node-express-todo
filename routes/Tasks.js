const taskRouter = require('express').Router()
const { getAllTasks, getTasksByUserId, postTask, updateTask, deleteTask } = require('../controllers/Tasks')

taskRouter.route('/')
    .get(getAllTasks)

taskRouter.route('/')
    .post(postTask)

taskRouter.route('/:id')
    .get(getTasksByUserId)
    .put(updateTask)
    .delete(deleteTask)

module.exports = taskRouter