require('dotenv').config()
const Application = require('./framework/Application')
const userRouter = require('./src/user-router')
const jsonParser = require('./framework/parseJson')
const urlParser = require('./framework/parseUrl')
const {MongoClient, ServerApiVersion } = require('mongodb')

const app = new Application()


const posts = [
  {id: 1, title: 'Title 1'},
  {id: 2, title: 'Title 2'},
  {id: 3, title: 'Title 3'},
]



app.use(jsonParser)
app.use(urlParser('http://localhost:5000/'))
app.addRouter(userRouter)

const client = new MongoClient(process.env.DATABASE_URL);
async function run() {
  try {
    const connect = await client.connect()
    console.log(connect)
    // const database = await client.db('sample_mflix', );
    // const movies = await database.collection('movies');
    // // Query for a movie that has the title 'Back to the Future'
    // const query = { title: 'Back to the Future' };
    // const movie = await movies.find({});
    // console.log(movies);
  } catch (e) {
    console.warn('Database error', e)
  }
  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}


app.listen(process.env.PORT, async () => {
  console.log(`Сервер запущен на ${process.env.PORT} порту`)

  await run()
})