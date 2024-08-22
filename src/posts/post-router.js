const Router = require('../../framework/Router')
const router = new Router()
const {database, getId} = require("../database")

router.post('/posts', (req, res) => {
  return res.send({message:'Post posts'})
})

router.get('/posts', (req, res) => {
  return res.send({message:'Get posts'})
})

router.put('/posts', (req, res) => {
  return res.send({message:'Put posts'})
})

router.delete('/posts', (req, res) => {
  return res.send({message:'Delete posts'})
})

module.exports = router