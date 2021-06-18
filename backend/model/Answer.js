const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    pollid: { type: mongoose.SchemaTypes.ObjectId, ref: 'poll' },
    voted: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'user' }]
});

const AnswerModel = mongoose.model('answer', AnswerSchema);

module.exports = AnswerModel;
