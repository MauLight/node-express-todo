require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/', (req, res) => res.send('Hello World'))

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
    console.log(`Server endpoints available at port: ${PORT}`)
})