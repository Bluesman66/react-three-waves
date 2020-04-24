require('dotenv').config();

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// mongo db
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// models
const { User } = require('./models/user');

// register user
app.post('/api/users/register', (req, res) => {
	const user = new User(req.body);

	user.save((err, doc) => {
		if (err) {
			return res.json({ success: false, err });
		}
		res.status(200).json({
			success: true,
			userdata: doc,
		});
	});
});

app.post('/api/users/login', (req, res) => {
	User.findOne({ email: req.body.email }, (err, user) => {
		if (!user) return res.json({ loginSuccess: false, message: 'Auth failed, email not found' });

		user.comparePassword(req.body.password, (err, isMatch) => {
			if (!isMatch) return res.json({ loginSuccess: false, message: 'Wrong password' });

			user.generateToken((err, user) => {
				if (err) return res.status(400).send(err);
				res.cookie('w_auth', user.token).status(200).json({
					loginSuccess: true,
				});
			});
		});
	});
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
	console.log(`Server is running at ${port}`);
});
