const express = require("express");
const router = express.Router();

const userController = require('./api-controllers/user-controllers');
const tweetController = require('./api-controllers/tweet-controllers');
//USER
router.post('/user/register', userController.registerUser);
router.post('/user/login',userController.loginUser);

//TWEET
router.post('/tweet/create',tweetController.createTweet);
router.get('/tweet/readAll/:id',tweetController.readAllTweet);
router.get('/tweet/read/:id',tweetController.readTweet);
router.put('/tweet/update/:id',tweetController.updateTweet);
router.delete('/tweet/delete/:id',tweetController.deleteTweet);

module.exports = router;