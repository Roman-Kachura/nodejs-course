const dotenv = require('dotenv')
dotenv.config()

console.log(process.pid)
console.log(process.env.PORT)
console.log(process.env.NODE_ENV)

// if(Math.random() > 0.5){
//   while (true){
//     console.log(process.pid)
//   }
// } else{
//   console.log('Процесс завершен!')
//   process.exit()
// }
