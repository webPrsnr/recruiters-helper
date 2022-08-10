const { v4: uuidv4 } = require("uuid");
const ResumeModel = require("../models/resume-model");

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
      resume_fields: resumFields,
    });
    return { resume };
  }
  async getResumesById(key) {
    const results = await ResumeModel.findAll({ where: { api_key: key } });
    return { results };
  }

  async getResume(key, id) {
    const results = await ResumeModel.findOne({
      where: { api_key: key, resume_id: id },
    });
    return { results };
  }
}

module.exports = new ResumeService();
