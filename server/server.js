const express = require('express')
const app = express()
const genres = require('./routes/genres')
const config = require('config')
const helmet = require('helmet')
// const morgan = require('morgan')
const bodyParser = require('body-parser')
const debug = require('debug')('app:startup')

app.use(express.static('../client'))
app.use('/api/genres', genres)
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())

// <=== Configuration ===>//
console.log('Application Name: ' + config.get('name'))
console.log('Mail Server: ' + config.get('mail.host'))

// <=== Development Variables ===>//
// if (app.get('env') === 'development') {
//   app.use(morgan('tiny'))
//   debug('Morgan enabled')
// }

app.listen(9000, () => console.log('listening on port 9000'))
