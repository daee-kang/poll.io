const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../model/User');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
require('dotenv').config();

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        },
        async (token, done) => {
            UserModel.findOne({
                email: token.user.email.toLowerCase()
            }, (err, user) => {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, {
                        name: user.name,
                        username: user.username,
                        _id: user._id
                    });
                } else {
                    return done(null, false);
                }
            });
        }
    )
);

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (username, password, done) => {
            try {
                return done(null, { username, password });
            } catch (error) {
                console.log(error);
                done(error);
            }
        }
    )
);

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (username, password, done) => {
            try {
                const user = await UserModel.findOne({ username });
                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }

                const validate = await user.isValidPassword(password);
                console.log(validate);

                if (!validate) {
                    return done(null, false, { message: 'Wrong Password' });
                }

                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
        }
    )
);