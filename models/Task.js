const { DataTypes } = require('sequelize')
const { sequelize } = require('../connection')

const Task = sequelize.define('Task', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'tasks'
})

module.exports = Task