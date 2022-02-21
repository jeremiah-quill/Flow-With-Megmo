const router = require("express").Router();
const zoomRoutes = require("./zoomRoutes");
const emailRoutes = require("./emailRoutes");
const braintreeRoutes = require("./braintreeRoutes");

router.use("/zoom", zoomRoutes);
router.use("/email", emailRoutes);
router.use("/braintree", braintreeRoutes);

module.exports = router;
