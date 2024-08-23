const Router = require('../../framework/Router')
const router = new Router()
const {database, getId} = require("../database")

router.post('/users', async (req, res) => {
  const createdUser = await database.collection('users').insertOne({name: req.body.name})
  const user = await database.collection('users').findOne({_id: createdUser.insertedId})
  return res.send(user)
})

router.get('/users', async (req, res) => {
  const {id} = req.params

  if (id) {
    const _id = getId(id)
    const user = await database.collection('users').findOne({_id})
    return user ? res.send(user) : res.send({message: 'User not found'})
  }

  const users = await database.collection('users').find().toArray()
  return res.send(users)
})

router.put('/users', async (req, res) => {
  const {id} = req.params

  if (id) {
    const _id = getId(id)

    const updatedUser = await database.collection('users').updateOne({_id}, {$set: {name: req.body.name}})

    if(updatedUser.modifiedCount !== 1) return res.send({message:'Something was wrong!'})

    const user = await database.collection('users').findOne({_id})
    return res.send(user)
  }
})

router.delete('/users', async (req, res) => {
  const {id} = req.params

  if (id) {
    const _id = getId(id)
    const user = await database.collection('users').findOne({_id})

    if(!user) return res.send({message: 'User not found'})

    const deletedUser = await database.collection('users').deleteOne({_id})

    if (deletedUser.deletedCount === 1) return res.send({message: 'User successfully deleted'})

    return res.send({message: 'Something wrong'})
  }
})

module.exports = router