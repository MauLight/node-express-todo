const portfinder = require('portfinder')
const app = require('./app')
const { sequelize } = require('./connection')

let serverPort
const getPort = portfinder.getPortPromise({
    port: 3000,
    stopPort: 8000
})
    .then(port => {
        serverPort = port
    })
    .catch(error => {
        console.error(error)
    })

const port = process.env.PORT || serverPort

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