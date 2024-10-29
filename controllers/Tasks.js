const Task = require('../models/Task')

const getAllTasks = async (req, res, next) => {

    try {
        const tasks = await Task.findAll()
        return res.status(200).json(tasks)
    } catch (error) {
        next(error)
    }
}

const getTasksByUserId = async (req, res, next) => {

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

    try {
        const { userId, name, description, dueDate, priority } = req.body
        if (name === '') return next(new Error('fields'))

        const alreadyPosted = await Task.findOne({
            where: {
                name, dueDate
            }
        })
        if (alreadyPosted) return next(new Error('already posted'))

        const newTask = await Task.create({ userId, name, description, dueDate, priority })
        res.status(201).json(newTask)
    } catch (error) {
        next(error)
    }
}

const updateTask = async (req, res, next) => {

    try {
        const id = req.params.id
        const { name, description, dueDate, priority } = req.body

        if (!name || !description || !dueDate) throw new Error('fields')

        await Task.update({ name, description, dueDate, priority }, {
            where: {
                id
            }
        })
        return res.status(200).json({ name, description, dueDate, priority })
    } catch (error) {
        next(error)
    }
}

const deleteTask = async (req, res, next) => {

    try {
        const id = req.params.id
        //* Erase task by id
        const task = await Task.findOne({
            where: {
                id
            }
        })
        if (task) {
            const deletedTask = await task.destroy()
            res.status(200).json(deletedTask)
        } else return next(new Error('not found'))

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