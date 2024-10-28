const mongoose = require("mongoose");
const {Schema} =  mongoose;
require('dotenv').config();
const URL = process.env.URL;

mongoose.connect(URL);

const UserSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String
});

const AccountSchema = new mongoose.Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    balance: Number
});

const User = mongoose.model('User', UserSchema);
const Account = mongoose.model('Account', AccountSchema);

module.exports = {
    User,
    Account
}

