const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema([{
  capability: Number,
  time: String,
  room: String,
  tickets: [{
    seat: String,
    available: Boolean,
    price: Number
  }]
}]);

  module.exports = mongoose.model('Session', SessionSchema);