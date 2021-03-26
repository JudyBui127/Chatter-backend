const express = require("express");
const router = express.Router();

let userController = require('./api-controllers/user-controllers');

router.post('/user/register', userController.registerUser);
router.post('/user/login',userController.loginUser);

module.exports = router;