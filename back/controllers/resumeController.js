const resumeService = require("../services/resumeService");
class ResumeController {
  async createResume(req, res, next) {
    try {
      const { key, fields, link } = req.body;
      const resumData = await resumeService.createNewResume(key, fields, link);
      return res.json(resumData);
    } catch (error) {
      console.log(error);
    }
  }
  async getAllResumes(req, res, next) {
    try {
      const {
        params: { apiKey },
      } = req;
      const resumes = await resumeService.getResumesById(apiKey);
      res.json(resumes);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ResumeController();
