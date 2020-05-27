const functions = require('firebase-functions');
const app = require('express')();
const FBAuth = require('./util/fbAuth');

const cos = require('cors');
app.use(cors());

const { db } = require('./util/admin');

const {
    signup
} = require('./handlers/users');

//user routes
app.post('/signup', signup);
