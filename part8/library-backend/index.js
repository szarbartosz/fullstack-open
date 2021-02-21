const { ApolloServer, gql, UserInputError } = require('apollo-server')

const mongoose = require('mongoose')
const Book = require ('./models/book')
const Author = require ('./models/author')

const MONGODB_URI = 'mongodb+srv://fullstack:mypassword@my-cluster.nznnl.mongodb.net/library-db?retryWrites=true&w=majority'

// const JWT_SECRET = 'rabarbar'

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connectoin to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  },
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  },
  type Author {
    name: String!
    bookCount: Int!
    born: Int
  },
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({})
      } else if (args.author && !args.genre) {
        const fetchedAuthor = await Author.findOne({ name: args.author })
        return Book.find({ author: fetchedAuthor })
      } else if (!args.author && args.genre) {
        return Book.find({ genres: { $in: [args.genre] }})
      } else {
        // return books.filter(b => b.author === args.author && b.genres.includes(args.genre))
        return null
      }
    },
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: (root) => {
      return Book.find({ author: root._id }).countDocuments()
    }
  },
  Mutation: {
    addBook: async (root, args) => {     
      let author = await Author.findOne({ name: args.author })
      
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
      }

      const book = new Book({ ...args, author: author })

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      return book
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})