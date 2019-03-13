const mongoose = require('mongoose');

const DB_URL = 'mongodb://admin:h11111@ds163825.mlab.com:63825/street-paper';

mongoose.connect(DB_URL, { useNewUrlParser: true });

const db = mongoose.connection;

db.once('open', (() => {
  console.log(`connected to database at ${DB_URL}`);
}));

const PaperSchema = new mongoose.Schema({
  nickname: { type: String },
  createdAt: {
    type: Date,
    default: new Date().toISOString()
  },
  memo: { type: String },
  loc: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: [Number]
  }
});

PaperSchema.index({ loc: '2dsphere' });
module.exports = mongoose.model('Paper', PaperSchema);
