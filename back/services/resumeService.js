const { v4: uuidv4 } = require("uuid");
const ApiError = require("../exeptions/api-error");
const ResumeModel = require("../models/resume-model");
const UserModel = require("../models/user-model");

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
    const user = await UserModel.findOne({
      where: {
        api_key: key,
      },
    });
    if (!user) {
      throw ApiError.NotFound(`User's api key '${key}' does not exist`);
    }
    const results = await ResumeModel.findAll({ where: { api_key: key } });
    return { results };
  }

  async getResume(key, id) {
    const results = await ResumeModel.findOne({
      where: { api_key: key, resume_id: id },
    });
    return { results };
  }

  async deleteResume(key, id) {
    const user = await UserModel.findOne({
      where: { api_key: key },
    });
    if (!user) {
      throw ApiError.NotFound(`User's api key '${key}' does not exist`);
    }
    const resume = await ResumeModel.findOne({
      where: { api_key: key, resume_id: id },
    });
    if (!resume) {
      throw ApiError.NotFound(`Resume's id '${id}' does not exist`);
    }
    const res = await ResumeModel.destroy({
      where: { api_key: key, resume_id: id },
    });
    if (res) {
      return true;
    }
  }
}

module.exports = new ResumeService();
