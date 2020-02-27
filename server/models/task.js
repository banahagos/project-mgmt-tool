const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  toJSON: {
    transform: function (doc, ret) {
      delete ret._v;
    }
  }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task;