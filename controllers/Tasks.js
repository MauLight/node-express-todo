const jwt = require('jsonwebtoken')
const secret = process.env.SECRET
const Task = require('../models/Task')

const getAllTasks = async (req, res, next) => {
    //* Verify user has access to resource.
    const decodedToken = jwt.verify(req.body.token, secret)
    if (!decodedToken) return next(new Error('token'))

    try {
        const tasks = await Task.findAll()
        return res.status(200).json({ tasks })
    } catch (error) {
        next(error)
    }
}

const getTasksByUserId = async (req, res, next) => {
    //* Verify user has access to resource.
    const decodedToken = jwt.verify(req.body.token, secret)
    if (!decodedToken) return next(new Error('token'))

    const id = req.params.id
    if (!id) return next(new Error('fields'))

    try {
        //* Find all tasks from current user.
        const tasks = await Task.findAll({
            where: {
                userId: id
            }
        })
        res.status(200).json(tasks)
    } catch (error) {
        next(error)
    }
}

const postTask = async (req, res, next) => {
    //* Verify user has access to resource.
    const decodedToken = jwt.verify(req.body.token, secret)
    if (!decodedToken) return next(new Error('token'))

    try {
        const { userId, name, description, dueDate } = req.body

        const alreadyPosted = await Task.findOne({
            where: {
                name, dueDate
            }
        })
        if (alreadyPosted) return next(new Error('already posted'))

        const newTask = await Task.create({ userId, name, description, dueDate })
        res.status(201).json(newTask)
    } catch (error) {
        next(error)
    }
}

const updateTask = async (req, res, next) => {
    //* Verify user has access to resource.
    const decodedToken = jwt.verify(req.body.token, secret)
    if (!decodedToken) return next(new Error('token'))

    try {
        const id = req.params.id
        const { name, description, dueDate } = req.body

        if (!name || !description || !dueDate) throw new Error('fields')

        await Task.update({ name, description, dueDate }, {
            where: {
                id
            }
        })
        return res.status(200).json({ name, description, dueDate })
    } catch (error) {
        next(error)
    }
}

const deleteTask = async (req, res, next) => {

    try {
        const id = req.params.id
        //* Erase task by id
        const deletedTask = await Task.destroy({
            where: {
                id
            }
        })
        res.status(200).json(deletedTask)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllTasks,
    getTasksByUserId,
    postTask,
    updateTask,
    deleteTask
}