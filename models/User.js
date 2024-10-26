const { DataTypes } = require('sequelize')
const { sequelize } = require('../connection')
const bcrypt = require('bcrypt')

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = 10
                const passwordHash = await bcrypt.hash(user.password, salt)
                user.password = passwordHash
            }
        },
        beforeUpdate: async (user) => {
            if (user.password) {
                const salt = 10
                const passwordHash = await bcrypt.hash(user.password, salt)
                user.password = passwordHash
            }
        }
    },
    defaultScope: {
        attributes: {
            exclude: ['password']
        }
    },
    tableName: 'users'
})

module.exports = User