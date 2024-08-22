const Router = require('../../framework/Router')
const router = new Router()
const {database, getId} = require("../database")

router.post('/users', (req, res) => {
  const body = {}
  req.setEncoding('utf8');
  req.on('data', (chunk) => {
    const c = JSON.parse(chunk)
    for (let key in c) {
      body[key] = c[key]
    }
  })
  req.on('end', async () => {
    const createdUser = await database.collection('users').insertOne({name: body.name})
    const user = await database.collection('users').findOne({_id: createdUser.insertedId})
    return res.send(user)
  })
})

router.get('/users', async (req, res) => {
  const {id} = req.params
  if (id) {
    const _id = getId(id)
    const user = await database.collection('users').findOne({_id})
    return user ? res.send(user) : res.send({message: 'User not found'})
  } else {
    const users = await database.collection('users').find().toArray()
    return res.send(users)
  }
})

router.put('/users', (req, res) => {
  req.setEncoding('utf8');
  const {id} = req.params

  if (id) {
    const _id = getId(id)
    const body = {}

    req.on('data', (chunk) => {
      const c = JSON.parse(chunk)
      for (let key in c) {
        body[key] = c[key]
      }
    })

    req.on('end', async () => {
      const updatedUser = await database
        .collection('users')
        .updateOne({_id}, {$set: {name: body.name}}, {upsert: false})
      return res.send(updatedUser)
    })
  }
})

router.delete('/users', async (req, res) => {
  const {id} = req.params

  if (id) {
    const _id = getId(id)
    const user = await database.collection('users').findOne({_id})
    if (user) {
      const deletedUser = await database.collection('users').deleteOne({_id})
      if (deletedUser) {
        return res.send({message: 'User successfully deleted'})
      } else {
        return res.send({message: 'Something wrong'})
      }
    } else {
      return res.send({message: 'User not found'})
    }

  }
})

module.exports = router