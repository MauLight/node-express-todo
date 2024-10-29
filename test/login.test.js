const request = require('supertest')
const app = require('../app')

describe('login route', () => {
    test('return token for validation', done => {
        request(app)
            .post('/api/login')
            .send({ username: 'TestUser', password: 'Password1234.' })
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((res) => {
                if (!res.body.token) throw new Error('token')
            })
            .end(done)
    })

    test('return 401 with invalid credentials', done => {
        request(app)
            .post('/api/login')
            .send({ username: 'wrongUser', password: 'wrongPassword1234.' })
            .expect(401, done)
    })

    test('return 401 wrong password', done => {
        request(app)
            .post('/api/login')
            .send({ username: 'TestUser', password: 'wrongPassword1234.' })
            .expect(400, done)
    })
})