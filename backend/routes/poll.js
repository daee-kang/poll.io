const express = require('express');
const passport = require('passport');
const AnswerModel = require('../model/Answer');
const PollModel = require('../model/Poll');
const UserModel = require('../model/User');
const UserPollsModel = require('../model/UserPolls');

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

        PollModel.findOneAndUpdate(
            { "_id": req.body.pollid, "answers._id": req.body.answerid },
            { $inc: { "answers.$.count": 1 } },
            { new: true })
            .then(poll => {
                res.send(poll);
            })
            .catch(err => console.log(err));
    }
);

module.exports = router;