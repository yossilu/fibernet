const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
    },
    status: {
      type: String
    }
  },
  {
    timestamps: true,
  }
)

const Task = mongoose.model('Task', TaskSchema)

module.exports = {
  Task
}