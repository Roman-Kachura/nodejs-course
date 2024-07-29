const fs = require('fs')
const path = require('path')

const users = [
  {name:'Roman', message:'Привет!'},
  {name:'Anton', message:'Как дела?'},
  {name:'Andrey', message:'Нормально!'}
]

const text = users.map(u => `${u.name}: ${u.message}`).join('\n')

fs.mkdir(path.resolve('dir1'),  (e) => e && console.log(e), )
fs.mkdir(path.resolve('dir4', 'dir5', 'dir6'), {recursive:true}, (e) => e && console.log(e), )
fs.mkdir(path.resolve('dir7', 'dir7', 'dir7'),  (e) => e && console.log(e)) // => Ошибка!

fs.writeFile(path.resolve(__dirname, 'write_text.txt'), text, (err) => {
  if(err) console.warn(err)
})

fs.appendFile(path.resolve(__dirname, 'write_text.txt'), '\nKostya: Я тоже тут!', (err) => {
  if(err){
    console.warn(err)
  }
})

// fs.rm(path.resolve(__dirname, 'write_text.txt'), 'Lena: Я тут одна!', (err) => {
//   if(err){
//     console.warn(err)
//   }
// })

fs.readFile(path.resolve('text.txt'), {encoding:'utf8'}, (err,data) => {
  console.log('Текст прочитанного файла: ', data)
})