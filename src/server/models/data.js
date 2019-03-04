const mongoose = require('mongoose');

const MemoSchema = new mongoose.Schema({
  nickname: { type: String },
  memo: { type: String },
  date: { type: String },
  currentLocation: { type: [String] }
});

module.exports = mongoose.model('Memo', MemoSchema);
