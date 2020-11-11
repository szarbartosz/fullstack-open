const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

morgan.token('person', (req) => {
  return JSON.stringify(req.body)
})

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
]

app.get('/api/persons', morgan('tiny'), (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.get('/info', morgan('tiny'), (req, res) => {
  res.send(
    `<h3>Phonebook has info for ${persons.length} people</h3>
    <p>${Date()}</p>`)
})

app.delete('/api/persons/:id', morgan('tiny'), (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})


app.post('/api/persons', morgan(':method :url :status :res[content-length] - :response-time ms :person'), (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({error: "name missing"})
  } else if (!body.number) {
    return res.status(400).json({error: "number missing"})
  } else if (persons.filter(person => person.name === body.name).length > 0) {
    return res.status(400).json({error: "name must be unique"})
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)
  res.json(person)
})

const generateId = () => {
  return Math.floor(Math.random() * 1000000)
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})