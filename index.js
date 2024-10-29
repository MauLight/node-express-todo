const app = require('./app')
const { sequelize } = require('./connection')
const port = process.env.PORT

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection succesful')
        return sequelize.sync()
    })
    .then(() => {
        console.log('Sync models')
        app.listen(port, () => console.log(`Endpoints available at http://localhost:${port}`))
    })
    .catch(error => console.log('Connection failed.', error))