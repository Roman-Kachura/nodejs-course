const {MongoClient, ObjectId} = require("mongodb")

const client = new MongoClient(process.env.DATABASE_URL)
const database = client.db('nodejs-course-db')
const getId = (id) => new ObjectId(id)


module.exports = {client, database, ObjectId, getId}