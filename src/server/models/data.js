const mongoose = require('mongoose');

const PaperSchema = new mongoose.Schema({
  nickname: { type: String },
  createdAt: { type: Number }, // 나중에 Date로
  memo: { type: String },
  loc: {
    type: {
      type: String
    },
    coordinates: [Number]
  }
});

module.exports = mongoose.model('Papers', PaperSchema);
