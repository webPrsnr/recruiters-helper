const { v4: uuidv4 } = require("uuid");
const ResumeModel = require("../models/resume-model");
const fieldService = require("./fieldService");

class ResumeService {
  async createNewResume(apiKey, resumFields, resumLink) {
    const candidate = await ResumeModel.findOne({
      where: { resume_link: resumLink },
    });
    if (candidate) {
      throw new Error("A resume with such an email already exists");
    }
    const resumID = uuidv4();
    const resume = await ResumeModel.create({
      api_key: apiKey,
      resume_id: resumID,
      resume_link: resumLink,
    });
    const fields = await fieldService.createFields(resumID, resumFields);
    return { resume, fields };
  }
}

module.exports = new ResumeService();
