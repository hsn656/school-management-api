const mongoose = require('mongoose');

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
    },
    classRoom: {
      type: mongoose.Schema.ObjectId,
      ref: 'ClassRoom',
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", ClassRoomSchema);
