const zoomRoutes = require("express").Router();

// get all gifts for testing
zoomRoutes.get("/", (req, res) => {
    console.log('hi')
  res.json('in zoomRoutes root')
});


module.exports = zoomRoutes;