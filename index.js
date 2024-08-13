require('dotenv').config()
const Application = require('./framework/Application')
const jsonParser = require('./framework/parseJson')
const urlParser = require('./framework/parseUrl')
const {client} = require("./src/database");

const userRouter = require('./src/users/user-router')

const app = new Application()

app.use(jsonParser)
app.use(urlParser('http://localhost:5000/'))
app.addRouter(userRouter)


app.listen(process.env.PORT, async () => {
  console.log(`Сервер запущен на ${process.env.PORT} порту`)

  try{
    const connect = await client.connect()
    if(connect) console.log('Database works correctly!')
  } catch (e) {
    await client.close()
    throw new Error('Database connection error')
  }
})