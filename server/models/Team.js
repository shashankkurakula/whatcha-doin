const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  members: [
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'user',
      required: true,
      unique: true,
    },
  ],
  admin: [
    { type: [mongoose.Schema.Types.ObjectId], ref: 'user', required: true },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('team', TeamSchema);
