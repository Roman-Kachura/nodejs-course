const {database, getId} = require("../database")
const userService = require('./user-service')

class UserController {
  async createUser(req, res) {
    try {
      const data = await userService.createUser(req.body.name)
      return res.send(data)
    } catch (e) {
      return res.end()
    }
  }

  async getUsers(req, res) {
    try {
      const {id} = req.params
      const data = await userService.getUsers(id)
      return res.send(data)
    } catch (e) {
      throw new Error(e)
    }
  }

  async updateUser(req, res) {
    try {
      const data = await userService.updateUser(req.params.id, req.body.name)
      return res.send(data)
    } catch (e) {
      throw new Error(e)
    }
  }

  async deleteUser(req, res) {
    try {
      const data = await userService.deleteUser(req.params.id)
      return res.send(data)
    } catch (e) {
      throw new Error(e)
    }
  }
}

module.exports = new UserController()