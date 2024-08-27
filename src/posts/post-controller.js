const postService = require('./post-service')

class PostController {
  async createPost(req, res) {
    try {
      const data = await postService.createPost(req.body.title, req.body.uid)
      return res.send(data)
    } catch (e) {
      throw new Error(e)
    }
  }

  async getPosts(req, res) {
    try {
      const data = await postService.getPosts(req.params.id)
      return res.send(data)
    } catch (e) {
      throw new Error(e)
    }
  }

  async updatePost(req, res) {
    try {
      const data = await postService.updatePost(req.params.id, req.body.title)
      return res.send(data)
    } catch (e) {
      throw new Error(e)
    }
  }

  async deletePost(req, res) {
    try {
      const data = await postService.deletePost(req.params.id)
      return res.send(data)
    } catch (e) {
      throw new Error(e)
    }
  }
}

module.exports = new PostController()