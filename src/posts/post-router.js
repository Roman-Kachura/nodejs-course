const Router = require('../../framework/Router')
const router = new Router()
const {database, getId} = require("../database")
const postController = require('./post-controller')

router.post('/posts', postController.createPost)

router.get('/posts', postController.getPosts)

router.put('/posts', postController.updatePost)

router.delete('/posts', postController.deletePost)

module.exports = router