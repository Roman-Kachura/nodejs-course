const Router = require('../framework/Router')

const router = new Router()

const getId = () => Math.floor(Math.random() * 10e6)

const users = [
  {id: 1, name: 'Ulbitv'},
  {id: 2, name: 'Roman'},
  {id: 3, name: 'Kostya'},
]

router.post('/users', (req, res) => {
  console.log(req.params)
})

router.get('/users', (req, res) => {
  return res.send(users)
})

router.put('/users', (req, res) => {
  console.log(req.params)
})

router.delete('/users', (req, res) => {
  console.log(req.params)
})

module.exports = router