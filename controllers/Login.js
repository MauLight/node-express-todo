const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Task = require('../models/Task')
const secret = process.env.SECRET

const loginUser = async (req, res, next) => {

    try {
        const { username, password } = req.body

        //* Check if password is valid.
        const isPasswordInvalid = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/.test(password)
        if (isPasswordInvalid) return next(new Error('password'))

        //* Retrieve the current user and include related tasks.    
        const currUser = await User.scope('withPassword').findOne({
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

        const isValid = await currUser.validatePassword(password)

        if (currUser && isValid) {
            //* Use username and id values to create token.
            const userForToken = {
                username,
                id: currUser.id
            }
            const token = jwt.sign(userForToken, secret)
            res.status(200).json({ id: currUser.id, username: currUser.username, tasks: currUser.tasks, token })
        } else {
            next(new Error('password'))
        }

    } catch (error) {
        next(new Error('login'))
    }
}

module.exports = {
    loginUser
}