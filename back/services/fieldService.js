const Field = require("../models/resume-field-model");
class FieldService {
  async createFields(resumID, resumFields) {
    const result = await Promise.all(
      resumFields.map((singleField) =>
        Field.create({
          resume_id: resumID,
          tag: singleField.tag,
          text: singleField.text,
        })
      )
    );
    return result;
  }
}

module.exports = new FieldService();
