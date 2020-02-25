const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
}, {
  toJSON: {
    transform: function (doc, ret) {
      delete ret.password;
      delete ret._v;
      delete ret._id;
    }
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User;