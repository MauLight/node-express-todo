const User = require('./models/User')
const Task = require('./models/Task')

const getAllTasks = async (_req, res, next) => {
    try {
        const tasks = await Task.findAll()
        return res.status(200).json({ tasks })
    } catch (error) {
        console.log(`Error: ${error}`)
        next(error)
    }
}

module.exports = {
    getAllTasks
}