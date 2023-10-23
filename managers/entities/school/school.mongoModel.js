const mongoose = require('mongoose');
const config = require('../../../config/index.config');
const userMongoModel = require('../user/user.mongoModel');

const SchoolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: userMongoModel.name,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("School", SchoolSchema);
