const router = require("express").Router();
const zoomRoutes = require("./zoomRoutes");
const emailRoutes = require("./emailRoutes");

router.use("/zoom", zoomRoutes);
router.use("/email", emailRoutes);

module.exports = router;
