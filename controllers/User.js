const User = require('../models/User')

const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await User.findAll()
        res.status(200).json(allUsers)
    } catch (error) {
        next(error)
    }
}

const postUser = async (req, res, next) => {
    try {
        const { username, password } = req.body
        //* Check if username was already added (unique).
        const userWasAdded = await User.findOne({
            where: {
                username
            }
        })
        if (userWasAdded) return next(new Error('taken'))

        //* Check if password has at least one uppercase, one number, and one special character.    
        const isPasswordInvalid = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/.test(password)
        if (!username || isPasswordInvalid) return next(new Error('password'))

        const newUser = await User.create({ username, password })
        res.status(201).json(newUser)
    } catch (error) {
        next(error)
    }
}

const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await User.findOne({
            where: {
                id
            }
        })
        if (user) {
            return res.status(200).json(user)
        } else {
            next()
        }
    } catch (error) {
        next(error)
    }
}

const deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id

        const user = await User.findOne({
            where: {
                id
            }
        })
        if (user) {
            const userToBeDeleted = await user.destroy()
            res.status(200).json(userToBeDeleted)
        } else {
            next()
        }

    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllUsers,
    postUser,
    getUserById,
    deleteUserById
}
