const Router = require('../../framework/Router')
const router = new Router()
const {database, getId} = require("../database")

router.post('/posts', async (req, res) => {
  const {title, uid} = req.body

  if (title && uid) {
    const isPostInDb = await database.collection('posts').findOne({uid, title})

    if (!isPostInDb) {
      const createdPost = await database.collection('posts').insertOne({uid, title})
      const post = await database.collection('posts').findOne({_id: createdPost.insertedId})
      return res.send(post)
    } else {
      return res.send({message: 'The post with such title has been created!'})
    }
  }
})

router.get('/posts', async (req, res) => {
  const id = req.params.id

  if(id){
    const _id = getId(id)
    const post = await database.collection('posts').findOne({_id})
    return res.send(post)
  }

  const posts = await database.collection('posts').find().toArray()
  return res.send(posts)
})

router.put('/posts', async (req, res) => {
  const id = req.params.id

  if (!id) return res.send({message: "A post's id not found!"})

  const _id = getId(id)

  if (!req.body.title) return res.send({message: "A post's title not found!"})

  const isPostInDb = await database.collection('posts').findOne({_id})

  if (!isPostInDb) return res.send({message: 'There is not a post with such id in the database!'})

  const updatedPost = await database.collection('posts').updateOne({_id}, {$set: {title: req.body.title}})

  if(updatedPost.modifiedCount === 1){
    const post = await database.collection('posts').findOne({_id})
    return res.send(post)
  } else {
    return res.send({message: 'Something was wrong!'})
  }
})

router.delete('/posts', async (req, res) => {
  const _id = getId(req.params.id)
  const isPostInDb = await database.collection('posts').findOne({_id})

  if (!isPostInDb) return res.send({message: 'There is not a post with such id in the database!'})

  const deletedPost = await database.collection('posts').deleteOne({_id})

  if (deletedPost.deletedCount === 1) {
    return res.send({message: 'The post has been deleted!'})
  } else {
    return res.send({message: 'Something was wrong!'})
  }
})

module.exports = router