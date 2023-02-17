const router = require("express").Router();
const apiController = require("../controllers/apiController");
const { uploadSingle } = require("../middleware/multer");

router.get("/landing-page", apiController.landingPage);
router.post("/sign-up", uploadSingle, apiController.signUp);
router.post("/sign-in", uploadSingle, apiController.signIn);
router.get("/get-me", uploadSingle, apiController.getMe);
router.delete("/logout", uploadSingle, apiController.logOut);
router.get("/detail-page/:id", apiController.detailPage);
router.post("/order-page", uploadSingle, apiController.orderPage);

module.exports = router;
