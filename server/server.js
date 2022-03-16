require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");

const routes = require("./controllers");
const app = express();

const PORT = process.env.PORT || 3001;

const { typeDefs, resolvers } = require("./schemas");

const db = require("./config/connection");

const server = new ApolloServer({
	typeDefs,
	resolvers,
});


const configServer = async () => {
	await server.start();
	server.applyMiddleware({ app });
};

configServer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);


if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once("open", () => {
	app.listen(PORT, () => {
		console.log(`API server running on port ${PORT}!`);
		console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
	});
});
