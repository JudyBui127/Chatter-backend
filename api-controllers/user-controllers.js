const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// let path = require("path");
const User = require('../models/user');
// let config = require('./../configs/config');

module.exports = {
    loginUser,
    registerUser
};

//CONTROLLERS

function registerUser(req, res) {
    let newUser = {
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password
    }
    register(newUser)
        .then(data => res.send(data))
        .catch(err => res.send({ status: 0, message: err }))
}

function loginUser(req, res) {

    let username = req.body.username,
        password = req.body.password;
    checkUser({ username, password })
        .then(data => {
            return res.json(data);
        })
        .catch(err => res.send({ status: 0, message: err }))
}

//HELPER FUNCTIONS

async function checkUser({ username, password }) {

    const user = await User.findOne({ username })
    if (!user)
        return ({ status: 0, message: 'Username is not correct!' })

    if (user && bcrypt.compareSync(password, user.password)) {
        //assign login token
        const token = jwt.sign({ userID: user._id}, config.secretString, { expiresIn: '1d' });

        return { status: 1, message: "Successfully logged in!", data: { user: user, token: token } }

    }
    else {
        return { status: 0, message: "Password is not correct!", data: null };
    }
}

async function register(userParams) {

    // check for unique username
    const userValidate = await User.findOne({ username: userParams.username });

    if (userValidate) {
        return ({ status: 0, message: 'Username is already taken' })
    }

    const user = new User({
        _id: userParams._id,
        username: userParams.username,
        password: userParams.password
    });

    const newuser = await user.save();


    if (newuser) {

        return ({ status: 1, message: "Register successful !", data: { user: user }})
    }
    return ({ status: 0, message: "Register failed !" })

}


