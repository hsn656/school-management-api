const mongoose = require('mongoose');
const userMongoModel = require('../user/user.mongoModel');

const SchoolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: userMongoModel.name,
    },
    admins: {
      type: [{
        type: mongoose.Schema.ObjectId,
        ref: userMongoModel.name,
      }],
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("School", SchoolSchema);
