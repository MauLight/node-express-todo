const Users = require('../models/User')

const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await Users.findOne({
            where: {
                id
            }
        })
        return res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUserById
}
