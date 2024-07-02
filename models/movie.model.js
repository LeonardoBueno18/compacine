const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  image: String,
  title: String,
  description: String,
  actors: [String],
  genre: String,
  sessions: [{ type: Schema.Types.ObjectId, ref: 'Session' }]
});

module.exports = mongoose.model('Movie', MovieSchema);