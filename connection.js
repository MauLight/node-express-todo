const { Sequelize } = require('sequelize')

//* Database configuration values
const database = process.env.DATABASE
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const host = process.env.HOSTNAME

const sequelize = new Sequelize(database, username, password, {
    host,
    dialect: 'postgres'
})

module.exports = {
    sequelize
}