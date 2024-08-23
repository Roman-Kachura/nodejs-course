module.exports = async (req, res) => {
  const body = {}

  req.setEncoding('utf8')

  await req.on('data', (chunk) => {
    const c = JSON.parse(chunk)
    for (let key in c) {
      body[key] = c[key]
    }
  })

  req.body = body
}