const mongoose = require('mongoose');

const TreeSchema = new mongoose.Schema({
    Node_Index: { type: String, required: true, unique: true },
    Left: { type: String },
    Right: { type: String }
}, { collection: 'Tree' })

const model = mongoose.model('TreeSchema', TreeSchema);

module.exports = model;