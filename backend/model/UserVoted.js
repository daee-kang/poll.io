const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserVotedSchema = new Schema({
    userid: { type: mongoose.SchemaTypes.ObjectId, ref: 'user' },
    voted: [{
        pollid: { type: mongoose.SchemaTypes.ObjectId, ref: 'poll' },
        answerid: { type: mongoose.SchemaTypes.ObjectId, ref: 'answer' }
    }],
});

UserVotedSchema.index({ userid: 1 });

const UserVotedModel = mongoose.model('uservoted', UserVotedSchema);

module.exports = UserVotedModel;