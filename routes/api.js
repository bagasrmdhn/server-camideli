const router = require("express").Router();
const apiController = require("../controllers/apiController");
const { uploadSingle } = require("../middleware/multer");

router.get("/landing-page", apiController.landingPage);
router.get("/detail-page/:id", apiController.detailPage);
router.post("/order-page", uploadSingle, apiController.orderPage);
module.exports = router;
