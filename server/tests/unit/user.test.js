const request = require('supertest')
const app = require('../../src/app')
const User = require('../../src/models/user.model')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

beforeEach(async () => setupDatabase())

test('Should signup a new user', async () => {
    const response = await request(app).post('/api/users').send({
        name: 'Briggs',
        email: 'briggs@example.com',
        password: 'test1234'
    }).expect(201)

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assert that response body matches input
    expect(response.body).toMatchObject({
        user: {
            name: 'Briggs',
            email: 'briggs@example.com'
        },
        token: user.tokens[0].token
    })
    
    // Assert that password is not stored as plain text
    expect(user.password).not.toBe('test1234')
})

test('Should login existing user with correct credentials', async () => {
    const response = await request(app).post('/api/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
    
    // Assert user exists in database
    const user = await User.findById(userOneId)
    expect(user).not.toBeNull()
    
    // Assert that response token matches token of user's profile in database
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login incorrect password', async () => {
    await request(app).post('/api/users/login').send({
        email: userOne.email,
        password: 'wrongpassword'
    }).expect(400)
})

test('Should get profile for user', async() => {
    await request(app)
    .get('/api/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not get profile for unauthenticated user', async() => {
    await request(app)
    .get('/api/users/me')
    .send()
    .expect(401)
})

test('Should delete account for user', async() => {
    await request(app)
    .delete('/api/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    
    // Assert user was deleted from database
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async() => {
    await request(app)
    .delete('/api/users/me')
    .send()
    .expect(401)
})

test('Should update valid user fields', async() => {
    const updateObject = {
        name: 'Briggs',
        email: 'briggs@example.com'
    }
    const response = await request(app)
    .patch('/api/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send(updateObject)
    .expect(200)

    expect(response.body).toMatchObject(updateObject)
})

test('Should not update invalid user fields', async () => {
    await request(app)
    .patch('/api/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        location: 'Sample location'
    })
    .expect(400)
})