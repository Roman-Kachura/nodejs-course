const http = require('http')
const eventEmitter = require('events')

module.exports = class Application {
  constructor() {
    this.emitter = new eventEmitter()
    this.server = this._createServer()
  }

  addRouter(router) {
    Object.keys(router.endpoints).forEach(path => {
      const endpoint = router.endpoints[path]

      Object.keys(endpoint).forEach(method => {
        const handler = endpoint[method]

        this.emitter.on(this._getRouterMask(path, method), (req, res) => handler(req, res))
      })
    })
  }

  _createServer() {
    return http.createServer((req, res) => {
      const emitted = this.emitter.emit(this._getRouterMask(req.url, req.method), req, res)

      if (!emitted) res.end(req.url)
    })
  }

  _getRouterMask(path, method) {
    return `[${path}]:[${method}]`
  }

  listen(port, callBack) {
    this.server.listen(port, callBack)
  }
}