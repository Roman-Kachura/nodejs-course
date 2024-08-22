const http = require('http')
const eventEmitter = require('events')

module.exports = class Application {
  constructor() {
    this.emitter = new eventEmitter()
    this.server = this._createServer()
    this.middleware = []
  }

  use(middleware) {
    this.middleware.push(middleware)
  }

  addRouter(router) {
    Object.keys(router.endpoints).forEach(path => {
      const endpoint = router.endpoints[path]

      Object.keys(endpoint).forEach(method => {
        this.emitter.on(this._getRouterMask(path, method), (req, res) => {
          const handler = endpoint[method]
          handler(req, res)
        })
      })
    })
  }

  _createServer() {
    return http.createServer((req, res) => {
      this.middleware.forEach(middleware => middleware(req, res))
      const emitted = this.emitter.emit(this._getRouterMask(req.pathname, req.method), req, res)

      if (!emitted) return res.end(req.url)
    })
  }

  _getRouterMask(path, method) {
    return `[${path}]:[${method}]`
  }

  listen(port, callBack) {
    this.server.listen(port, callBack)
  }
}