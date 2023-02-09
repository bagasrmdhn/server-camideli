const adminController = require("../controllers/adminController");
const { uploadMultiple } = require("../middleware/multer");
const auth = require("../middleware/auth");

const router = require("express").Router();

router.get("/signin", adminController.viewSignin);
router.post("/signin", adminController.actionSignin);
router.use(auth);
router.get("/logout", adminController.actionLogout);
router.get("/dashboard", adminController.viewDashboard);

// endpoint untuk item
router.get("/item", adminController.viewItem); // show item
router.post("/item", uploadMultiple, adminController.addItem); // add item
router.get("/item/show-image/:id", adminController.showImageItem); // show image item
router.get("/item/:id", adminController.showEditItem); // show edit item
router.put("/item/:id", uploadMultiple, adminController.editItem); // show edit item
router.delete("/item/:id/delete", adminController.deleteItem); // delete item
router;

// endpoint untuk category
router.get("/category", adminController.viewCategory);
router.post("/category", adminController.addCategory);
router.put("/category", adminController.editCategory);
router.delete("/category/:id", adminController.deleteCategory);
// router.post("/item", adminController.addItem);

// endpoint untuk bank
router.get("/bank", adminController.viewBank);
router.post("/bank", adminController.addBank);
router.put("/bank", adminController.editBank);
router.delete("/bank/:id", adminController.deleteBank);

// endpoint untuk feature
router.get("/order", adminController.viewOrder);
router.get("/order/:id", adminController.showDetailOrder);
router.put("/order/:id/confirmation", adminController.actionConfirmation);
router.put("/order/:id/reject", adminController.actionReject);

module.exports = router;
