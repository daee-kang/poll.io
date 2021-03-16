const express = require('express');
const PollModel = require('../model/Poll');
const UserModel = require('../model/User');

const router = express.Router();

router.post(
    '/create',
    async (req, res, next) => {
        if (req.body.question === undefined) return res.json("err, no question");
        if (req.body.answers === undefined || req.body.answers.length === 0) return res.json("err, no answers");

        let parsedAnswers = [];
        for (let i = 0; i < req.body.answers.length; i++) {
            parsedAnswers.push({
                answer: req.body.answers[i],
                count: 0
            });
        }

        //create poll
        let created = await PollModel.create({
            question: req.body.question,
            answers: parsedAnswers,
            zipcode: req.body.zipcode
        });

        //add poll to users polls
        UserModel.findOne({ username: req.user.username })
            .then((result, err) => {
                if (err) return res.json(err);

                result.polls.push(created._id);
                result.save();
                return res.json("poll created noob");
            })
            .catch(err => { console.log(err); });
    }
);

module.exports = router;