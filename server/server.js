const express = require("express");
const routes = require("./controllers");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.listen(3001, () => {
	console.log("listening on port 3001");
});
