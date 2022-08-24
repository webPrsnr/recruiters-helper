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

  async getResume(req, res, next) {
    try {
      const {
        params: { apiKey, resumId },
      } = req;
      const resume = await resumeService.getResume(apiKey, resumId);
      res.json(resume);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteResume(req, res, next) {
    try {
      const {
        params: { apiKey, resumId },
      } = req;
      const deleteFlag = await resumeService.deleteResume(apiKey, resumId);
      if (deleteFlag) return res.status(200).json({ message: "OK" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ResumeController();
