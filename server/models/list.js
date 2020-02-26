const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
  name: String,
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  boardId: { type: Schema.Types.ObjectId, ref: 'Board' }
}, {
  toJSON: {
    transform: function (doc, ret) {
      delete ret._v;
    }
  }
})

const List = mongoose.model('List', listSchema)

module.exports = List;