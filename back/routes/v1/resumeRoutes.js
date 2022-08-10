const Router = require("express").Router;
const resumeController = require("../../controllers/resumeController");
const authMiddleware = require("../../middlewares/auth-middleware");

const router = new Router();

router.post("/resume", resumeController.createResume);

//auth
router.get("/resume/:apiKey", resumeController.getAllResumes);

router.get("/resume/:apiKey/:resumId", resumeController.getResume);

module.exports = router;
