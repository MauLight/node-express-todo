const request = require('supertest')
const app = require('../app')
const { v4: uuidv4 } = require('uuid')

const id = uuidv4()

describe('create user 201', () => {
    test('return token for validation', done => {
        request(app)
            .post('/api/user')
            .send({ username: `TestUser${id}`, password: 'Password1234.' })
            .expect("Content-Type", /json/)
            .expect(201)
            .end(done)
    })

    test('return 400 with wrong password', done => {
        request(app)
            .post('/api/user')
            .send({ username: 'TestUser8', password: 'wrongPassword' })
            .expect(400, done)
    })

    //* Will only work if TestUser is created
    test('return 401 user taken', done => {
        request(app)
            .post('/api/user')
            .send({ username: 'TestUser', password: 'wrongPassword1234.' })
            .expect(401, done)
    })
})