const router = require('../../framework/Router')
const {database, client, getId} = require("../database")

router.post('/users', (req, res) => {
  console.log(req.params)
})

router.get('/users', async (req, res) => {
  const {id} = req.params
  if (id) {
    const _id = getId(id)
    const user = await database.collection('users').findOne({_id})
    return user ? res.send(user) : res.send({message:'User not found'})
  } else {
    const users = await database.collection('users').find().toArray()
    return res.send(users)
  }
})

router.put('/users', (req, res) => {
  console.log(req.params)
})

router.delete('/users', (req, res) => {
  const {id} = req.params

  if(id){
    const _id = getId(id)
    const deletedUser = database.collection('users').deleteOne({_id})
    if(deletedUser) return res.send({message:'User successfully deleted'})
     return res.send({message:'Something wrong'})
  }
  return res.send({message:'User not found'})
})

module.exports = router