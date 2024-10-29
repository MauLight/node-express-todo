const request = require('supertest')
const app = require('../app')

test('index route works', done => {
    request(app)
        .get('/')
        .expect("Content-Type", /json/)
        .expect({ message: 'Hello World' })
        .expect(200, done)
})