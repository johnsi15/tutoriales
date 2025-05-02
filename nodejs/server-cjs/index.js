const http = require('http')
const suma = require('./app.js')

const server = http.createServer((req, res) => {
  console.log('Server is running')

  console.log(suma(2, 3))

  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ message: 'Hola desde mi servidor Node.js! 😊' }))
})

server.listen(3000, () => {
  console.log('Server is running on port 3000')
})
