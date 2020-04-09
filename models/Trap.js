const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TrapSchema = new Schema({
  trap_id: String,
  headers: String,
  body: String,
  method: String,
  ip: String,
  cookies: String,
  query: String,
  params: String,
  schema: String,
});

module.exports = mongoose.model('Trap', TrapSchema);
