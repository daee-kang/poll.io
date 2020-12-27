const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const UserModel = require('../model/User');
require('dotenv').config()

const router = express.Router()

router.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
        UserModel.create({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }).then((data) => {
            console.log(`user ${req.body.username} created`)
            res.json(data)
        }).catch(err => {
            console.log(`SIGNUP ERR: ${err}`)
            res.json(err)
        })
    }
);

router.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate(
            'login',
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        const error = new Error('An error occurred.');

                        console.log(`LOGIN ERR: ${error}`)
                        return next(error);
                    }

                    req.login(
                        user,
                        { session: false },
                        async (error) => {
                            if (error) return next(error);

                            const body = { _id: user._id, email: user.email };
                            const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

                            return res.json({ token });
                        }
                    );
                } catch (error) {
                    console.log(`LOGIN ERR: ${error}`)
                    return next(error);
                }
            }
        )(req, res, next);
    }
);

module.exports = router;