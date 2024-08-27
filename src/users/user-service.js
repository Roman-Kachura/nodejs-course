const {database, getId} = require("../database");

class UserService {
  constructor() {
    this.collection = database.collection('users')
  }

  async createUser(name) {
    if (!name) throw new Error('User name not found!')

    try {
      const createdUser = await this.collection.insertOne({name})
      const user = await database.collection('users').findOne({_id: createdUser.insertedId})
      return user
    } catch (e) {
      throw new Error(e)
    }
  }

  async getUsers(id) {
    try {
      if (id) {
        const _id = getId(id)
        const user = await this.collection.findOne({_id})
        return user ? user : {message: 'User not found'}
      }

      const users = await this.collection.find().toArray()
      return users
    } catch (e) {
      throw new Error(e)

    }
  }

  async updateUser(id, name) {
    try {
      if (id) {
        const _id = getId(id)

        const updatedUser = await this.collection.updateOne({_id}, {$set: {name}})

        if (updatedUser.modifiedCount !== 1) return {message: 'Something was wrong!'}

        const user = await this.collection.findOne({_id})
        return user
      }
    } catch (e) {
      throw new Error(e)

    }
  }

  async deleteUser(id) {
    try {
      if (id) {
        const _id = getId(id)
        const user = await this.collection.findOne({_id})

        if (!user) return {message: 'User not found'}

        const deletedUser = await this.collection.deleteOne({_id})

        if (deletedUser.deletedCount === 1) return {message: 'User successfully deleted'}

        return {message: 'Something wrong'}
      }
    } catch (e) {
      throw new Error(e)

    }
  }
}

module.exports = new UserService()