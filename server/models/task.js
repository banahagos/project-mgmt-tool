const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: String,
  listId: { type: Schema.Types.ObjectId, ref: 'Board' }
}, {
  toJSON: {
    transform: function (doc, ret) {
      delete ret._v;
    }
  }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task;