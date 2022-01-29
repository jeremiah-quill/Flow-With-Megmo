const router = require("express").Router();
const zoomRoutes = require("./zoomRoutes");
// const groupRoutes = require("./groupRoutes");
// const giftRoutes = require("./giftRoutes");

router.use("/zoom", zoomRoutes);
// router.use("/groups", groupRoutes);
// router.use("/gifts", giftRoutes);

module.exports = router;
