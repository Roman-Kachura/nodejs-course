require('dotenv').config()

const http = require('http')
const port = process.env.PORT || 4999

const users = [
  {id: 1, name: 'Roman'},
  {id: 2, name: 'Andrey'},
  {id: 3, name: 'Vitaliy'},
]

const posts = [
  {id: 1, text: 'Hello world!'},
  {id: 2, text: 'The second post!'},
  {id: 3, text: 'Another post!'},
]

function getData(url) {
  if (url === '/users') return users
  if (url === '/posts') return posts
  if (url === '/') return 'Home page!'
  return url
}

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'})
  res.end(JSON.stringify(getData(req.url)))
})

server.listen(port, () => {
  console.log(`Сервер работает с портом ${port}`)
})


// const server = http.createServer()
//
// server.listen(port, () => {
//   console.log(`Сервер работает с портом ${port}`)
// })

// server.on('request', (req, res) => {
//   res.writeHead(200, {'Content-Type': 'application/json'})
//   res.end(JSON.stringify(getData(req.url)))
// })