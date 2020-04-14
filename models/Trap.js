const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TrapSchema = new Schema({
  trapId: String,
  headers: String,
  body: String,
  method: String,
  ip: String,
  cookies: String,
  query: String,
  params: String,
  protocol: String,
  path: String,
  createdAt: Date,
}, {
  timestamps: true,
  collectionName: true,
});

module.exports = mongoose.model('Trap', TrapSchema);
