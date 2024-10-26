const Task = require('../models/Task')

const getAllTasks = async (_req, res, next) => {
    try {
        const tasks = await Task.findAll()
        return res.status(200).json({ tasks })
    } catch (error) {
        console.log(`Error: ${error}`)
        next(error)
    }
}

const postTask = async (req, res, next) => {
    try {
        const { userId, name, description, dueDate } = req.body

        const alreadyPosted = await Task.findOne({
            where: {
                name, dueDate
            }
        })
        if (alreadyPosted) return res.status(400).json({ message: 'Task was added already.' })

        const newTask = await Task.create({ userId, name, description, dueDate })
        res.status(201).json(newTask)
    } catch (error) {
        next(error)
    }
}

const updateTask = async (req, res, next) => {
    try {
        const id = req.params.id
        const { name, description, dueDate } = req.body

        if (!name || !description || !dueDate) throw new Error('fields')

        const updatedTask = await Task.update({ name, description, dueDate }, {
            where: {
                id
            }
        })
        console.log(updatedTask)
        return res.status(200).json({ name, description, dueDate })
    } catch (error) {
        next(error)
    }
}

const deleteTask = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) return res.status(400).json({ message: 'User must provide a task id.' })

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
    postTask,
    updateTask,
    deleteTask
}