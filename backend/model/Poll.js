const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PollSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answers: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'answer' }],
    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

PollSchema.index({ location: '2dsphere' });

const PollModel = mongoose.model('poll', PollSchema);

module.exports = PollModel;