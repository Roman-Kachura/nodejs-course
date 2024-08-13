const router = require('../framework/Router')
const {database} = require("./database");

const getId = () => Math.floor(Math.random() * 10e6)

router.post('/users', (req, res) => {
  console.log(req.params)
})

router.get('/users', async (req, res) => {
  const users = await database.collection('users').find().toArray()
  return res.send(users)
})

router.put('/users', (req, res) => {
  console.log(req.params)
})

router.delete('/users', (req, res) => {
  console.log(req.params)
})

module.exports = router