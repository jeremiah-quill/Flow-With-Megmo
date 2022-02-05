require("dotenv").config();
const express = require("express");
const { ApolloServer } = require('apollo-server-express');
const routes = require("./controllers");
const app = express();



const { typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');

const server = new ApolloServer({
	typeDefs,
	resolvers,
  });

server.applyMiddleware({ app });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.listen(3001, () => {
	console.log("listening on port 3001");
});

db.once('open', () => {
	app.listen(PORT, () => {
	  console.log(`API server running on port ${PORT}!`);
	  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
	});
  });
