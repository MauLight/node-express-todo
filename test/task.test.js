const request = require('supertest')
const app = require('../app')
const { v4: uuidv4 } = require('uuid')
const { format } = require('date-fns')

const id = uuidv4()
const now = Date.now()

describe('Tasks routes', () => {
    let token
    let idToDelete

    beforeAll(done => {
        request(app)
            .post('/api/login')
            .send({ username: 'TestUser', password: 'Password1234.' })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                token = res.body.token

                request(app)
                    .get('/api/tasks')
                    .set('Authorization', `Bearer ${token}`)
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err)
                        const tasks = res.body
                        console.log(tasks, 'These are the TASKS')
                        idToDelete = tasks[tasks.length - 2].id
                        console.log(idToDelete, 'This is the IDTODELETE')
                        done()
                    })
            })
    })

    test('return 201 when CREATE task', done => {
        request(app)
            .post('/api/tasks')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
            .send({
                userId: '1',
                name: `Task name ${id}`,
                description: 'Description',
                dueDate: format(now, 'yyyy/MM/d'),
                priority: '0'
            })
            .expect("Content-Type", /json/)
            .expect(201, done)
    })

    test('return 401 when CREATE task with no token', done => {
        request(app)
            .post('/api/tasks')
            .set('Authorization', `Bearer `)
            .set('Content-Type', 'application/json')
            .send({
                userId: '1',
                name: `Task name ${id}`,
                description: 'Description',
                dueDate: format(now, 'yyyy/MM/d'),
                priority: '0'
            })
            .expect("Content-Type", /json/)
            .expect(401, done)
    })

    test('return 400 when CREATE task with no name', done => {
        request(app)
            .post('/api/tasks')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
            .send({
                userId: '1',
                name: '',
                description: 'Description',
                dueDate: format(now, 'yyyy/MM/d'),
                priority: '0'
            })
            .expect("Content-Type", /json/)
            .expect(400, done)
    })

    test('return 200 when UPDATE task', done => {
        request(app)
            .put('/api/tasks/1')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
            .send({
                userId: '1',
                name: `Task names ${id}`,
                description: 'Description',
                dueDate: format(now, 'yyyy/MM/d'),
                priority: '0'
            })
            .expect("Content-Type", /json/)
            .expect(200, done)
    })

    test('return 404 when UPDATE task with wrong id', done => {
        request(app)
            .put('/api/tasks/x')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
            .send({
                userId: '1',
                name: `Task name ${id}`,
                description: 'Description',
                dueDate: format(now, 'yyyy/MM/d'),
                priority: '0'
            })
            .expect(404, done)
    })

    test('return 401 when UPDATE task with no token', done => {
        request(app)
            .put('/api/tasks/1')
            .set('Authorization', `Bearer `)
            .set('Content-Type', 'application/json')
            .send({
                userId: '1',
                name: `Task name ${id}`,
                description: 'Description',
                dueDate: format(now, 'yyyy/MM/d'),
                priority: '0'
            })
            .expect(401, done)
    })

    test('return 200 when DELETE task', done => {
        request(app)
            .delete(`/api/tasks/${idToDelete}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
            .expect("Content-Type", /json/)
            .expect(200, done)
    })

    test('return 400 when DELETE task with wrong id', done => {
        request(app)
            .delete('/api/tasks/x')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
            .expect("Content-Type", /json/)
            .expect(404, done)
    })

    test('return 401 when DELETE task with no token', done => {
        request(app)
            .delete('/api/tasks/1')
            .set('Authorization', `Bearer `)
            .set('Content-Type', 'application/json')
            .expect("Content-Type", /json/)
            .expect(401, done)
    })
})