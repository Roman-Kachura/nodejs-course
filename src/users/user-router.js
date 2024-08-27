const Router = require('../../framework/Router')
const router = new Router()
const {database, getId} = require("../database")
const userController = require('./user-controller')

router.post('/users', userController.createUser)

router.get('/users', userController.getUsers)

router.put('/users', userController.updateUser)

router.delete('/users', userController.deleteUser)

module.exports = router