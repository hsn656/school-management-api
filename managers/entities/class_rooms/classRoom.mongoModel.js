const mongoose = require('mongoose');
const userMongoModel = require('../user/user.mongoModel');
const schoolMongoModel = require('../school/school.mongoModel');

const ClassRoomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    school: {
      type: mongoose.Schema.ObjectId,
      ref: 'School',
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ClassRoom", ClassRoomSchema);
