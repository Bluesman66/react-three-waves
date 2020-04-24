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

const port = process.env.PORT || 3002;

app.listen(port, () => {
	console.log(`Server is running at ${port}`);
});
