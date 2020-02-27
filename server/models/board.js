const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = new Schema({
  name: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  toJSON: {
    transform: function (doc, ret) {
      delete ret._v;
    }
  }
})

const Board = mongoose.model('Board', boardSchema)

module.exports = Board;