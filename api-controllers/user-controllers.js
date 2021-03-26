const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// let path = require("path");
const User = require('../models/user');
let config = require('./../config');

module.exports = {
    loginUser,
    registerUser
};

// HTTP STATUS CODE
const STATUS_CODE = {
    BAD_REQUEST: { status: 400, message: 'Bad request!' },
    UNAUTHORIZED: { status: 401, message: 'Unauthorized!' },
    NOT_FOUND: { status: 404, message: 'Not found!' },
    FAILED_ACTION: { status: 424, message: 'Failed Dependency!' },
    USERNAME_ALREADY_TAKEN: { status: 424, message: 'Username is already taken!' },
    INTERNAL_ERROR: { status: 500, message: 'Internal Server Error!' },

    SUCCESS_REGISTER: { status: 201, message: "Register successful!" },
    FAILED_REGISTER: { status: 424, message: "Register failed!" },

    SUCCESS_LOGIN: { status: 200, message: "Successfully logged in!" },
}

//CONTROLLERS

function registerUser(req, res) {
    const { username, password } = req.body
    const newUser = {
        _id: new mongoose.Types.ObjectId(),
        username: username,
        password: password
    }
    register(newUser)
        .then(data => res.send(data))
        .catch(err => handleException(err, res))
}

function loginUser(req, res) {
    const { username, password } = req.body
    if (!username || !password) res.send({ status: 400, message: 'Bad request!' });
    checkUser({ username, password })
        .then(data => res.json(data))
        .catch(err => handleException(err, res))
}

//HELPER FUNCTIONS

async function checkUser({ username, password }) {
    const user = await User.findOne({ username });
    if (!user) return STATUS_CODE.NOT_FOUND;

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return STATUS_CODE.UNAUTHORIZED;
    //assign login token
    const token = jwt.sign({ userID: user.id }, config.secretString, { expiresIn: '1d' });
    const dataUser = {
            id: user.id,
            username: user.username
    };
    const data = {dataUser, token }
    return { ...STATUS_CODE.SUCCESS_LOGIN, data }
}

function handleException(error, res) {
    console.log(error.message)
    res.send(STATUS_CODE.INTERNAL_ERROR)
}

async function register(userParams) {
    const { _id, username, password } = userParams;
    // check for unique username
    const userValidate = await User.findOne({ username });
    if (userValidate) {
        // Failed Dependency
        return STATUS_CODE.USERNAME_ALREADY_TAKEN
    }
    const registerUser = new User({ _id, username, password });
    const newuser = await registerUser.save();
    if (newuser) {
        const data = {
            user: {
                id: newuser.id,
                username: newuser.username
            }
        };
        return { ...STATUS_CODE.SUCCESS_REGISTER, data };
    }
    return STATUS_CODE.FAILED_REGISTER;
}


