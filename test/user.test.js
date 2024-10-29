const request = require('supertest')
const app = require('../app')
const { v4: uuidv4 } = require('uuid')

const id = uuidv4()

describe('User routes', () => {
    test('create user returns 201', done => {
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

    test('return 200 when get user, id is valid', done => {
        request(app)
            .get('/api/user/1')
            .expect("Content-Type", /json/)
            .expect(200, done)
    })

    test('return 404 when get user, id is not valid', done => {
        request(app)
            .get('/api/user/x')
            .expect(404, done)
    })

    //* Will only work if user with id 8 exists.
    test('return 200 when delete user, id is valid', done => {
        request(app)
            .delete('/api/user/8')
            .expect("Content-Type", /json/)
            .expect(200, done)
    })

    test('return 404 when delete user, id is not valid', done => {
        request(app)
            .delete('/api/user/x')
            .expect(404, done)
    })
})