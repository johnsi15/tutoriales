import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://'],
    methods: ['GET', 'POST'],
  })
)

let users = [
  {
    id: 1,
    name: 'John Serrano',
    email: 'js@gmail.com',
  },
  {
    id: 2,
    name: 'Juan',
    email: 'juan@gmail.com',
  },
  {
    id: 3,
    name: 'Ammi',
    email: 'ammi@gmail.com',
  },
]

// 200 OK
// 201 Created
// 400 Bad Request
// 401 Unauthorized
// 404 Not Found
// 500 Internal Server Error

// CRUD -> create, read, update, delete

// cors

app.get('/users', (req, res) => {
  res.json(users)
})

app.get('/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId)

  const user = users.find(u => u.id === userId)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.json(user)
})

app.post('/users', (req, res) => {
  const { name, email } = req.body // -> destructuring { name, email } from req.body

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' })
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
  }

  users.push(newUser)
  res.setHeader('Content-Type', 'application/json')
  res.status(201).json({ message: 'User created successfully', data: newUser })
})

app.put('/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId)
  const user = users.find(u => u.id === userId)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const { name, email } = req.body

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' })
  }

  const userUpdate = { name, email }

  Object.assign(user, userUpdate)

  res.json({ message: 'User updated successfully', data: userUpdate })
})

app.patch('/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId)
  const user = users.find(u => u.id === userId)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const userUpdate = req.body

  Object.assign(user, userUpdate)

  res.json({ message: 'User patch successfully', data: userUpdate })
})

app.delete('/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId)

  const user = users.find(u => u.id === userId)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  users = users.filter(u => u.id !== userId)

  // res.status(204).json({ message: 'User deleted successfully' })
  res.json({ message: 'User deleted successfully' })
})

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`)
})
