const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserPollsSchema = new Schema({
    userid: { type: mongoose.SchemaTypes.ObjectId, ref: 'user' },
    polls: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'poll' }]
});

const UserPollsModel = mongoose.model('userpolls', UserPollsSchema);

module.exports = UserPollsModel;