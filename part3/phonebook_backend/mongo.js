const mongoose = require('mongoose')

if (process.argv.length != 3 && process.argv.length != 5) {
  console.log('Wrong Usage! Try: node mongo.js <password> <name> <phone> or node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@my-cluster.pslha.mongodb.net/phonebook-db?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3) {
  mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true })
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length == 5) {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

  const person = new Person({
    name: `${name}`,
    number: `${number}`
  })

  person.save().then(result => {
    console.log('contact saved!')
    console.log(`added ${name} - ${number} to phonebook`)
    mongoose.connection.close()
  })
}



