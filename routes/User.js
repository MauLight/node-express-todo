const userRouter = require('express').Router()
const { getAllUsers, postUser, getUserById, deleteUserById } = require('../controllers/User')

userRouter.route('/')
    .get(getAllUsers)
    .post(postUser)

userRouter.route('/:id')
    .get(getUserById)
    .delete(deleteUserById)

module.exports = userRouter