const Router = require('../framework/Router')

const router = new Router()

const users = [
  {id: 1, name: 'Ulbitv'},
  {id: 2, name: 'Roman'},
  {id: 3, name: 'Kostya'},
]

router.get('/users', (req, res) => {
  return res.end(JSON.stringify(users))
})

module.exports = router