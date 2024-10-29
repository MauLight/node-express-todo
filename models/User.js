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
                const salt = await bcrypt.genSalt(10)
                user.password = await bcrypt.hash(user.password, salt)
            }
        },
        beforeUpdate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10)
                user.password = await bcrypt.hash(user.password, salt)
            }
        }
    },
    defaultScope: {
        attributes: {
            exclude: ['password']
        }
    },
    scopes: {
        withPassword: {
            attributes: { include: ['password'] }
        }
    },
    tableName: 'users'
})

User.prototype.validatePassword = async function (password) {
    const isValid = await bcrypt.compare(password, this.password)
    return isValid
}

module.exports = User