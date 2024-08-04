const path = require('path')

const fullPath = path.resolve('first', 'second', 'third.js')

console.log('Склеить участки пути', path.join(__dirname, '..', '..', '..'))
console.log('Получить абсолютный путь', fullPath)
console.log('Парсинг пути',path.parse(fullPath))
console.log('Разделитель в ОС',path.sep)
console.log('Проверка на абсолютный путь',path.isAbsolute('fits/second'))
console.log('Название файла',path.basename(fullPath))
console.log('Расширение файла',path.extname(fullPath))

// ----------------------

const siteURL = 'http://localhost:8080/users?id=543'

const url = new URL(siteURL)

console.log(url)