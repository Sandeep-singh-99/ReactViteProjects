const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { schema } = require('./graphql/schema/schema');
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');

const ConnectDB = require('./utils/db')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


const server = new ApolloServer({
  typeDefs: schema,
  resolvers: {
    Query: {
      hello: () => 'Hello world!',
      users: () => {
        return [
          {
            _id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123'
          }
        ]
      }
    }
  },
})


startStandaloneServer(server, {
  listen: {
    port: 5000,
  }
}).then(() => {
  console.log('Server is running on http://localhost:5000');
  ConnectDB();
}).catch((error) => {
  console.error('Error starting server:', error);
  process.exit(1);
})