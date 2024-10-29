const { Sequelize } = require('sequelize')

//* Database configuration values
const database = 'todo_db'
const username = 'todo_user'
const password = process.env.DB_PASSWORD
const host = process.env.HOSTNAME

const sequelize = new Sequelize(database, username, password, {
    host,
    dialect: 'postgres'
})

module.exports = {
    sequelize
}