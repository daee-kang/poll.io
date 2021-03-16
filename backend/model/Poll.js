const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PollSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answers: [
        {
            answer: {
                type: String,
                required: true
            },
            count: {
                type: Number,
                default: 0
            }
        }
    ],
    zipcode: String
});

const PollModel = mongoose.model('poll', PollSchema);

module.exports = PollModel;