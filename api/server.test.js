const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
// beforeEach(async () => {
//   await db.seed.run()
// })
afterAll(async () => {
  await db.destroy()
})

describe('post api/auth/login', () => {
  test('login rejects invalid credentials', async () => {
    const res = await request(server).post('/api/auth/login').send({username: "jadenwa", password: "1234"})
    expect(res.body).toEqual({"message": "invalid credentials"})
  })

  test('can login', async () => {
    const user = await request(server).post('/api/auth/register').send({username: "jadenwa", password: "1234"})
    const token = await request(server).post('/api/auth/login').send({username: "jadenwa", password: "1234"})
    expect(token.body).toHaveProperty("token")
  })
})

describe('post api/auth/register', () => {
  test('can register', async () => {
    const user = await request(server).post('/api/auth/register').send({username: "jadenwa", password: "1234"})
    const token = await request(server).post('/api/auth/login').send({username: "jadenwa", password: "1234"})
    expect(token.body).toHaveProperty("token")
  })
})
