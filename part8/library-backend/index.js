const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const jwt = require('jsonwebtoken')
const pubsub = new PubSub()

const mongoose = require('mongoose')
const Book = require ('./models/book')
const Author = require ('./models/author')
const User = require('./models/user')

const MONGODB_URI = 'mongodb+srv://fullstack:mypassword@my-cluster.nznnl.mongodb.net/library-db?retryWrites=true&w=majority'

const JWT_SECRET = 'rabarbar'

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
  type Book {
    title: String!
    published: Int!
    author: Author
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    books: [Book!]!
    bookCount: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
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
    allAuthors: () => Author.find({}).populate('books'),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    name: async (root) => {
      const author = await Author.findById(root._id)
      return author.name
    },
    born: async (root) => {
      const author = await Author.findById(root._id)
      return author.born
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {     
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      let author = await Author.findOne({ name: args.author })
      
      if (!author) {
        author = new Author({ name: args.author, bookCount: 0 })
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
        await Author.findOneAndUpdate({ name: author.name}, { books: author.books.concat(book), bookCount: author.bookCount + 1 })
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

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
    },

    createUser: async (root, args) => {
      const user = new User({ ...args })

      try {
        await user.save()
      } catch (error) {
        throw new UserInputError((error), {
          invalidArgs: args
        })
      }

      return user
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret' ) {
        throw new UserInputError('wrong credentials!')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )

      const currentUser = await User
        .findById(decodedToken.id)

      return { currentUser }
    }
  }  
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})