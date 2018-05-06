const express = require('express')
const app = express()
const genres = require('./routes/genres')
const config = require('config')

// <=== Debug functions ===>//
const debug = require('debug')('app:startup')

// <=== Router  ===>//
app.use('/api/genres', genres)
app.use(express.static('./client'))

// <=== Middleware ===>//
const helmet = require('helmet')
const morgan = require('morgan')
const logger = require('./logger')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet())
app.use(logger)

// <=== Configuration ===>//
console.log('Application Name: ' + config.get('name'))
console.log('Mail Server: ' + config.get('mail.host'))
console.log('Mail Password: ' + config.get('mail.password'))

// <=== Development Variables ===>//
if (app.get('env') === 'development') {
  app.use(morgan('tiny'))
  debug('Morgan enabled')
}

app.listen(9000, () => console.log('listening on port 9000'))
