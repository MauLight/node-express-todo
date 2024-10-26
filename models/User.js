const { DataTypes } = require('sequelize')
const { sequelize } = require('../connection')

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    defaultScope: {
        attributes: {
            exclude: ['password']
        }
    },
    tableName: 'users'
})

module.exports = User