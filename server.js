const express = require('express')
const app = express()
const config = require('config')

// <=== Debug functions ===>//
const debug = require('debug')('app:startup')

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

// <=== Temp Data ===>//
const genres = [
  { id: 1, name: 'sci-fi' },
  { id: 2, name: 'fantasy' },
  { id: 3, name: 'action' },
  { id: 4, name: 'adventure' },
  { id: 5, name: 'mystery' }
]

// <=== Routes ===>//
app.get('/api/genres', (req, res) => {
  res.send(genres)
})

app.get('/api/genres/:name', (req, res) => {
  const genre = genres.find(arr => arr.name === req.params.name)
  !genre ? res.status(400).send('that genre is not found') : res.send(genre)
})

app.post('/api/genres', (req, res) => {
  const genre = {
    id: genres.length + 1,
    name: req.body.name
  }

  if (req.body.name.length < 3) return res.status(400).send('name is too short')
  genres.push(genre)
  res.send(genre)
})

app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find(arr => arr.id === parseInt(req.params.id))
  if (!genre) return res.status(400).send('That id is not in the DB')

  genre.name = req.body.name
  res.send(genre)
})

app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find(arr => arr.id === parseInt(req.params.id))
  if (!genre) return res.status(400).send('That id is not in the DB')

  const index = genres.indexOf(genre)
  genres.splice(index, 1)
  res.send(genre)
})

app.listen(9000, () => console.log('listening on port 9000'))
