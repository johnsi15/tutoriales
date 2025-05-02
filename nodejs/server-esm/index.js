import http from 'http'

const server = http.createServer((req, res) => {
  console.log(req.url)
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ message: 'Hola, watch de node.js 22 🚀' }))
})

server.listen(3001, () => {
  console.log('Server is running on port 3001')
})
