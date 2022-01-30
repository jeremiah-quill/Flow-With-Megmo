const router = require("express").Router();
const zoomRoutes = require("./zoomRoutes");
const braintreeRoutes = require("./braintreeRoutes");

router.use("/zoom", zoomRoutes);
router.use("/braintree", braintreeRoutes);

module.exports = router;
