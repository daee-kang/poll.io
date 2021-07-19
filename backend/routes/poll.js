const express = require('express');
const passport = require('passport');
const AnswerModel = require('../model/Answer');
const PollModel = require('../model/Poll');
const UserModel = require('../model/User');
const UserPollsModel = require('../model/UserPolls');
const UserVotedModel = require('../model/UserVoted');

const router = express.Router();

//get all the polls within a given range(radius) from long,lat
//answers array are not filled at this point to reduce latency :D
router.get(
    '/get',
    async (req, res, next) => {
        if (req.query.longitude === undefined) return res.json("no longitude");
        if (req.query.latitude === undefined) return res.json("no latitude");
        if (req.query.range === undefined) return res.json("no range");

        const { longitude, latitude, range } = req.query;
        console.log(longitude, latitude, range);

        PollModel.find({
            location: {
                $nearSphere: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: range
                }
            }
        })
            .populate('answers')
            .exec((err, data) => {
                if (err) console.log(err);

                console.log(data);
                res.json(data);
            });
    }
);

router.get(
    '/getPoll',
    async (req, res, next) => {
        if (req.query.pollid === undefined) return res.json("no pollid");
        console.log(req.query.pollid);

        PollModel.findById(req.query.pollid)
            .populate('answers')
            .exec((err, poll) => {
                if (err) console.log(err);

                console.log(poll);
                res.json(poll);
            });
    }
);

router.post(
    '/create',
    async (req, res, next) => {
        if (req.body.question === undefined) return res.json("err, no question");
        if (req.body.answers === undefined || req.body.answers.length === 0) return res.json("err, no answers");
        if (req.body.location === undefined) return res.json("sorry no location provided");

        //create poll
        let created = await PollModel.create({
            question: req.body.question,
            answers: [],
            location: req.body.location
        });

        //create answers
        let answers = [];
        for (let i = 0; i < req.body.answers.length; i++) {
            let answer = await AnswerModel.create({
                pollid: created._id,
                title: req.body.answers[i].text,
                voted: []
            });
            answers.push(answer._id);
        }

        //add answers to newly created poll
        created.answers = answers;
        created.save();

        //add the new poll id to userpolls
        UserPollsModel.findOneAndUpdate(
            { userid: req.user._id },
            { $push: { polls: created._id } },
            { upsert: true },
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.json(err);
                }

                console.log(result);
                res.json("poll created xD");
            }
        );
    }
);

router.post(
    '/vote',
    async (req, res, next) => {
        if (req.body.pollid === undefined || req.body.answerid === undefined) return res.json("missing data");
        const { pollid, answerid } = req.body;

        UserVotedModel.findOne({
            userid: req.user._id
        }, (err, uservote) => {
            if (err) res.json(err);

            //check to see if we voted for this post
            if (uservote && uservote.voted.length !== 0) {
                for (let vote of uservote.voted) {
                    if (vote.pollid == pollid) {
                        return res.json("Voted already");
                    }
                }
            }

            //update answer model and finally to uservoted
            AnswerModel.findOneAndUpdate(
                { "_id": answerid },
                { $push: { voted: req.user._id } },
                { new: true })
                .then(poll => {
                    UserVotedModel.findOneAndUpdate({
                        userid: req.user._id
                    },
                        {
                            $push: {
                                voted: {
                                    pollid,
                                    answerid
                                }
                            }
                        },
                        { upsert: true })
                        .then(result => {
                            console.log(result);
                            res.send(result);
                        });
                })
                .catch(err => console.log(err));
        });
    }
);

/* 
    TO-DO: 
    we can possible cache all our vote results on application load and other parts so that
    instead of loading each time we open a poll page, we don't query individually everytime
*/
router.get(
    '/getUserVotes',
    async (req, res, next) => {
        UserVotedModel.findOne(
            { userid: req.user._id }
        ).then(data => {
            if (!data) {
                return res.json(`Error: no votes`);
            }
            //return voted array
            res.json(data.voted);
        }).catch(err => {
            console.log(err);
        });
    }
);

router.get(
    '/getUserVoteFromPoll',
    async (req, res, next) => {
        console.log(req.query);
        if (req.query.pollid === undefined) return res.json("Missing pollid");

        UserVotedModel.findOne(
            { userid: req.user._id }
        ).then(data => {
            if (!data) {
                return res.json(`Error: no votes`);
            }

            for (let i = 0; i < data.voted.length; i++)
                if (data.voted[i].pollid == req.query.pollid)
                    return res.json(data.voted[i].answerid);

            //return voted array
            return res.json(`Not voted`);
        }).catch(err => {
            console.log(err);
        });
    }
);

module.exports = router;