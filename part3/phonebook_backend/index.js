require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')
const bodyParser = require('body-parser')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

morgan.token('person', (request) => {
  return JSON.stringify(request.body)
})

app.get('/api/persons', morgan('tiny'), (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.get('/info', morgan('tiny'), (request, response) => {
  Person.countDocuments({}, function(err, count){
    if (count === 1) {
      response.send(
        `<h3>Phonebook has info for ${count} person</h3>
         <p>${Date()}</p>`)
    } else {
      response.send(
        `<h3>Phonebook has info for ${count} people</h3>
         <p>${Date()}</p>`)
    }
  })
})

app.post('/api/persons', morgan('tiny'), (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({error: "name missing"})
  } else if (body.number === undefined) {
    return response.status(400).json({error: "number missing"})
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})


// middleware

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id'})
  }

  next(error)
}

app.use(errorHandler)