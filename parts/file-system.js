const fs = require('fs')
const path = require('path')

const users = [
  {name: 'Roman', message: 'Привет!'},
  {name: 'Anton', message: 'Как дела?'},
  {name: 'Andrey', message: 'Нормально!'}
]

const text = users.map(u => `${u.name}: ${u.message}`).join('\n')

// fs.mkdir(path.resolve('dir1'), (e) => e && console.log(e),)
// fs.mkdir(path.resolve('dir4', 'dir5', 'dir6'), {recursive:true}, (e) => e && console.log(e), )
// fs.mkdir(path.resolve('dir7', 'dir7', 'dir7'),  (e) => e && console.log(e)) // => Ошибка!
// fs.rm(path.resolve('dir1'), {recursive: true}, (e) => {
//   if (e) console.log(e)
//   return 'Папка удалена'
// })
// fs.writeFile(path.resolve(__dirname, 'write_text.txt'), text, (err) => {
//   if (err) console.warn(err)
// })

// fs.appendFile(path.resolve(__dirname, 'write_text.txt'), '\nKostya: Я тоже тут!', (err) => {
//   if (err) {
//     console.warn(err)
//   }
// })

// fs.rm(path.resolve(__dirname, 'write_text.txt'), 'Lena: Я тут одна!', (err) => {
//   if(err){
//     console.warn(err)
//   }
// })

// fs.readFile(path.resolve('text.txt'), {encoding: 'utf8'}, (err, data) => {
//   console.log('Текст прочитанного файла: ', data)
// })

function writeFileAsync(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (e) => {
      if (e) return reject(e)
    })

    return resolve()
  })
}

function appendFileAsync(path, data) {
  return new Promise((resolve, reject) => {
    fs.appendFile(path, data, (e) => {
      if (e) return reject()
      return resolve();
    })
  })
}

function readFileAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, {encoding: 'utf8'}, (e, data) => {
      if (e) return reject()
      return resolve(data)
    })
  })
}

function rmFileAsync(path) {
  return new Promise((resolve, reject) => {
    fs.rm(path, (e) => {
      if (e) return reject()
      return resolve();
    })
  })
}

writeFileAsync(path.resolve(__dirname, 'parts', 'write_text.txt'), text)
  .then()
  .catch()

writeFileAsync(path.resolve(__dirname, 'parts', 'write_text_1.txt'), 'file will be deleted')
  .then()
  .catch(e => console.log(e))

appendFileAsync(path.resolve(__dirname, 'parts', 'write_text.txt'), '/\nKostya: Я тоже тут!')
  .then()
  .catch(e => console.log(e))

readFileAsync(path.resolve(__dirname, 'parts', 'write_text.txt'))
  .then(data => console.log(`Прочитанный файл: ${data}`))
  .catch(e => console.log(e))

rmFileAsync(path.resolve(__dirname, 'parts', 'write_text_1.txt'))
  .then()
  .catch(e => console.log(e))
