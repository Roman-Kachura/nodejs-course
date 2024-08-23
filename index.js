require('dotenv').config()
const Application = require('./framework/Application')
const jsonParser = require('./framework/parseJson')
const urlParser = require('./framework/parseUrl')
const bodyParser = require('./framework/parseBody')
const {client} = require("./src/database");

const userRouter = require('./src/users/user-router')
const postRouter = require('./src/posts/post-router')

const app = new Application()

app.use(jsonParser)
app.use(bodyParser)
app.use(urlParser('http://localhost:5000/'))
app.addRouter(userRouter)
app.addRouter(postRouter)


app.listen(process.env.PORT, async () => {
  console.log(`Сервер запущен на ${process.env.PORT} порту`)

  try{
    await client.connect()
  } catch (e) {
    await client.close()
    throw new Error('Database connection error')
  }
})