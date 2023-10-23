const mongoose = require('mongoose');
const userMongoModel = require('../user/user.mongoModel');
const schoolMongoModel = require('../school/school.mongoModel');

const ClassRoomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: userMongoModel.name,
    },
    school: {
      type: mongoose.Schema.ObjectId,
      ref: schoolMongoModel.name,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ClassRooms", ClassRoomSchema);
