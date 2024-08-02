const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const { ApolloArmor } = require('@escape.tech/graphql-armor');

// Define the schema
const typeDefs = gql`
  type Number {
    litteralName: String
    numberRepresentation: Int
    primeDividers: [Number]
    following: Number
    preceding: Number
    isPrime: Boolean
  }

  type Query {
    numberRepresentation(value: Int!): Number
  }
`;

// Helper function to get prime dividers
const getPrimeDividers = (num) => {
  const primes = [];
  for (let i = 2; i <= num; i++) {
    while ((num % i) === 0) {
      primes.push(i);
      num /= i;
    }
  }
  return [...new Set(primes)];
};

// Helper function to check if a number is prime
const isPrime = (num) => {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// Helper function to get the literal name of a number
const getLiteralName = (num) => {
  const literalNames = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
  return literalNames[num];
};

// Generate data for numbers between 0 and 10 dynamically
const numbers = [];
for (let i = 0; i <= 10; i++) {
  numbers.push({
    litteralName: getLiteralName(i),
    numberRepresentation: i,
    primeDividers: getPrimeDividers(i),
    following: i < 10 ? i + 1 : null,
    preceding: i > 0 ? i - 1 : null,
    isPrime: isPrime(i),
  });
}

// Resolver functions
const resolvers = {
  Query: {
    numberRepresentation: (_, { value }) => {
      if (value < 0 || value > 10) return null;
      return numbers[value];
    },
  },
  Number: {
    following: (number) => number.numberRepresentation < 10 ? numbers[number.numberRepresentation + 1] : null,
    preceding: (number) => number.numberRepresentation > 0 ? numbers[number.numberRepresentation - 1] : null,
    primeDividers: (number) => number.primeDividers.map(divider => numbers[divider]),
  },
};

// Create an instance of ApolloArmor
const armor = new ApolloArmor({
  maxDirectives: { // the default value is too big to be met in a test
    enabled: true,
    n: 1
  },
});

// Create an instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers, ...armor.protect(), debug: false});

// Set up Express app
const app = express();
server.start().then(() => {
  server.applyMiddleware({ app });

  // Serve the OpenAPI documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Endpoint to download the OpenAPI specification
  app.get('/openapi.yaml', (req, res) => {
  res.type('yaml');
  res.send(swaggerDocument);
});

  port = 4002;
  path = 'secure';
  // Start the server
  app.listen({ port: port }, () => {
    console.log(`🚀🚀🚀 Starting ${path} app 🚀🚀🚀 `);
    console.log(`🚀 Server ready at http://localhost:4000/${path}${server.graphqlPath}`);
    console.log(`🚀 Swagger UI ready at http://localhost:4000/${path}/api-docs`);
    console.log(`🚀 OpenAPI spec available at http://localhost:4000/${path}/openapi.yaml`);
  });
});

