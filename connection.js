const { Sequelize } = require('sequelize')

const database = 'todo_db'
const username = 'todo_user'
const password = 'password'
const host = 'localhost'

const sequelize = new Sequelize(database, username, password, {
    host,
    dialect: 'postgres'
})

module.exports = {
    sequelize
}