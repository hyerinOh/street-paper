const mongoose = require('mongoose');

const PaperSchema = new mongoose.Schema({
  nickname: { type: String },
  createdAt: { type: Number },
  memo: { type: String },
  loc: {
    type: String,
    coordinates: [Number]
  }
});

module.exports = mongoose.model('Papers', PaperSchema);
