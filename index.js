require('dotenv').config()
const Application = require('./framework/Application')
const userRouter = require('./src/user-router')

const app = new Application()


const posts = [
  {id: 1, title: 'Title 1'},
  {id: 2, title: 'Title 2'},
  {id: 3, title: 'Title 3'},
]




app.addRouter(userRouter)

app.listen(process.env.PORT, () => {
  console.log(`Сервер запущен на ${process.env.PORT} порту`)
})