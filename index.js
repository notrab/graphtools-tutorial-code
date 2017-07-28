const express = require('express')
const { makeExecutableSchema } = require('graphql-tools')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const bodyParser = require('body-parser')

const app = express()

const products = [
  { id: 1, name: 'NOR810', sku: 'nor810' },
  { id: 2, name: 'NOR820', sku: 'nor820' }
]

const typeDefs = `
  type Product {
    id: Int!
    name: String
    sku: String
  }

  type Query {
    allProducts: [Product]
  }
`

const resolvers = {
  Query: {
    allProducts: () => products
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql'
  })
)

app.listen(4000)
