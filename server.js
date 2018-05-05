const logger = require('./logger')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const genres = [
  { id: 1, name: 'sci-fi' },
  { id: 2, name: 'fantasy' },
  { id: 3, name: 'action' },
  { id: 4, name: 'adventure' },
  { id: 5, name: 'mystery' }
]

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(logger)

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
