const Router = require("express").Router;
const resumeController = require("../../controllers/resumeController");

const router = new Router();

router.post("/resume", resumeController.createResume);
router.get("/resume", resumeController.getAllResumes);

module.exports = router;
