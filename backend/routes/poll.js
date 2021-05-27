const express = require('express');
const PollModel = require('../model/Poll');
const UserModel = require('../model/User');

const router = express.Router();

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
        }, (err, data) => {
            if (err) console.log(err);

            console.log(data);
            res.json(data);
        },
            (err) => {
                console.log(err);
            });
    }
);

router.post(
    '/create',
    async (req, res, next) => {
        if (req.body.question === undefined) return res.json("err, no question");
        if (req.body.answers === undefined || req.body.answers.length === 0) return res.json("err, no answers");
        if (req.body.location === undefined) return res.json("sorry no location provided");

        let parsedAnswers = [];
        for (let i = 0; i < req.body.answers.length; i++) {
            parsedAnswers.push({
                answer: req.body.answers[i].text,
                count: 0
            });
        }

        //create poll
        let created = await PollModel.create({
            question: req.body.question,
            answers: parsedAnswers,
            location: req.body.location
        });

        //add poll to users polls
        UserModel.findOne({ username: req.user.username })
            .then((result, err) => {
                if (err) return res.json(err);

                result.polls.push(created._id);
                result.save();
                console.log('poll created', created);
                return res.json("poll created noob");
            })
            .catch(err => { console.log(err); });
    }
);

router.put(
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