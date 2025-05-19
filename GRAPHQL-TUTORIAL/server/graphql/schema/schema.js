// graphql/schema/schema.js

export const schema = `#graphql
    type Todo {
        _id: ID!
        title: String!
    }

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
    }

    type Query {
        hello: String
        users: [User]
        getTodos: [Todo]
        getTodoById(id: ID!): Todo
    }

    type Mutation {
        createTodo(title: String!): Todo
    }
`;
