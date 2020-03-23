const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  label: { type: String, required: true, unique: true },
  done: { type: Boolean }
});

module.exports = mongoose.model('Note', NoteSchema);