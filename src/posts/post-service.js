const {database, getId} = require("../database")

class PostService{
  constructor() {
    this.collection = database.collection('posts')
  }

  async createPost(title, uid){
    try {
      if (title && uid) {
        const isPostInDb = await this.collection.findOne({uid, title})

        if (!isPostInDb) {
          const createdPost = await this.collection.insertOne({uid, title})
          const post = await this.collection.findOne({_id: createdPost.insertedId})
          return post
        } else {
          return {message: 'The post with such title has been created!'}
        }
      }
    }catch (e) {
      throw new Error(e)
    }
  }

  async getPosts(id){
    try {
      if(id){
        const _id = getId(id)
        const post = await this.collection.findOne({_id})
        return post
      }

      const posts = await this.collection.find().toArray()
      return posts
    }catch (e) {
      throw new Error(e)
    }
  }

  async updatePost(id,title){
    try {
      if (!id) return {message: "A post's id not found!"}

      const _id = getId(id)

      if (!title) return {message: "A post's title not found!"}

      const isPostInDb = await this.collection.findOne({_id})

      if (!isPostInDb) return {message: 'There is not a post with such id in the database!'}

      const updatedPost = await this.collection.updateOne({_id}, {$set: {title}})

      if(updatedPost.modifiedCount === 1){
        const post = await this.collection.findOne({_id})
        return post
      } else {
        return {message: 'Something was wrong!'}
      }
    }catch (e) {
      throw new Error(e)
    }
  }

  async deletePost(id){
    try {
      const _id = getId(id)
      const isPostInDb = await this.collection.findOne({_id})

      if (!isPostInDb) return {message: 'There is not a post with such id in the database!'}

      const deletedPost = await this.collection.deleteOne({_id})

      if (deletedPost.deletedCount === 1) {
        return {message: 'The post has been deleted!'}
      } else {
        return {message: 'Something was wrong!'}
      }
    }catch (e) {
      throw new Error(e)
    }
  }
}

module.exports = new PostService()