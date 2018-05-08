const express = require('express')
const router = express.Router()

// <=== Temp Data ===>//
const genres = [
  { id: 1, name: 'sci-fi' },
  { id: 2, name: 'fantasy' },
  { id: 3, name: 'action' },
  { id: 4, name: 'adventure' },
  { id: 5, name: 'mystery' }
]

// <=== Routes ===>//
router.get('/', (req, res) => {
  res.send(genres)
})

router.get('/:name', (req, res) => {
  const genre = genres.find(arr => arr.name === req.params.name)
  !genre ? res.status(400).send('that genre is not found') : res.send(genre)
})

router.post('/', (req, res) => {
  const genre = {
    id: genres.length + 1,
    name: req.body.name
  }

  if (req.body.name.length < 3) return res.status(400).send('name is too short')
  genres.push(genre)
  res.send(genre)
})

router.put('/:id', (req, res) => {
  const genre = genres.find(arr => arr.id === parseInt(req.params.id))
  if (!genre) return res.status(400).send('That id is not in the DB')

  genre.name = req.body.name
  res.send(genre)
})

router.delete('/:id', (req, res) => {
  const genre = genres.find(arr => arr.id === parseInt(req.params.id))
  if (!genre) return res.status(400).send('That id is not in the DB')

  const index = genres.indexOf(genre)
  genres.splice(index, 1)
  res.send(genre)
})

module.exports = router
