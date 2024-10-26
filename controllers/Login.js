const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Task = require('../models/Task')
const secret = process.env.SECRET

const loginUser = async (req, res, next) => {
    const { username, password } = req.body

    const isPasswordInvalid = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/.test(password)
    if (isPasswordInvalid) return next(new Error('password'))

    const currUser = await User.findOne({
        where: {
            username
        },
        include: [
            {
                model: Task,
                as: 'tasks',
                attributes: ['id', 'name', 'description', 'dueDate']
            }
        ]
    })

    const userForToken = {
        username,
        id: currUser.id
    }
    const token = jwt.sign(userForToken, secret)
    res.status(200).json({ id: currUser.id, username: currUser.username, tasks: currUser.tasks, token })
}

module.exports = {
    loginUser
}