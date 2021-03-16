const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

//-------MONGODB STUFF
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('database connected'))
    .catch(err => console.log(err));
mongoose.set("useCreateIndex", true);
mongoose.set('useFindAndModify', false);
mongoose.connection.on('error', error => console.log(error));
mongoose.Promise = global.Promise;

require('./auth/auth');

//-------EXPRESS STUFF
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//-------REQUIRE ROUTES
const authenticateRoute = require('./routes/authenticate');
const pollRoute = require('./routes/poll');

//-------LOADIN ROUTES
app.use('/', authenticateRoute);
app.use('/poll', passport.authenticate('jwt', { session: false, failureFlash: true }), pollRoute);

// Handle errors.
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});

app.listen(8000, () => {
    console.log(`Server started on port 8000`);
});