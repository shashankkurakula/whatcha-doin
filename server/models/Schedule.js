const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  assigneeName: {
    type: String,
    required: true,
  },
  assigneeAvatar: {
    type: String,
  },
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  reporterName: {
    type: String,
    required: true,
  },
  reporterAvatar: {
    type: String,
  },
  key: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  resolution: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = Schedul = mongoose.model('schedule', ScheduleSchema);
