const Router = require("express").Router;
const userController = require("../../controllers/userController");
const authMiddleware = require("../../middlewares/auth-middleware");

const router = new Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/cv", authMiddleware, userController.getAllCV);

module.exports = router;
