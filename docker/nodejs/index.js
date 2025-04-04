const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('hola mundo')
})

app.listen(3000, () => {
  console.log('On server in port 3000 - http://localhost:3000')
})
