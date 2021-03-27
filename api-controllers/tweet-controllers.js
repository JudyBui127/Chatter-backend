const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
// const jwt = require('jsonwebtoken');
// let path = require("path");
const Tweet = require('../models/tweet');
// let config = require('./../config');

module.exports = {
    createTweet,
    updateTweet,
    readAllTweet,
    readTweet,
    deleteTweet
};
const STATUS_CODE = {
   SUCCESS_ALL: { status: 200, message: "Success!" },
   SUCCESS_DELETE: { status: 200, message: "Deleted tweet!" },
    BAD_REQUEST: { status: 400, message: 'Bad request!' },
    FAILED_ACTION: { status: 424, message: 'Failed to tweet!' },
    UNAUTHORIZED: { status: 401, message: 'Unauthorized!' },
    NOT_FOUND: { status: 404, message: 'Not found!' },
    INTERNAL_ERROR: { status: 500, message: 'Internal Server Error!' },
}

//CREATE NEW TWEET
function createTweet(req, res) {
    const newTweet = {
        _id: new mongoose.Types.ObjectId(),
        content: req.body.content,
        created: Date.now(),
        updated: Date.now(),
        postedBy:req.body.userId
    };
    create(newTweet)
    .then(data => res.send(data))
    .catch(err => handleException(err, res))
}

//READ ALL TWEETS FROM USER
function readAllTweet(req, res) {
    // const allTweet =  Tweet.find({ postedBy: req.body.userId});
    // if (!allTweet) return STATUS_CODE.NOT_FOUND;
    // res.send(allTweet);
    Tweet.find({ postedBy : req.body.userId })
    .then((results, errors) => {
        res.send(results);
    })
    .catch(err => handleException(err, res))
}

//READ 1 TWEET
function readTweet(req, res) {
    Tweet.findOne({ _id: req.params.id })
    .then(result  => 
        res.send(result)
    )
    .catch(err => handleException(err, res))
}

//UPDATE TWEET
function updateTweet(req,res){
    const tweetId=req.params.id;
    const updatedTweet={
        content: req.body.content,
        updated: Date.now()
    }
    update(tweetId,updatedTweet)
    .then(data => res.send(data))
    .catch(err => handleException(err, res))
}

//DELETE TWEET
function deleteTweet(req,res){
    Tweet.findByIdAndDelete({ _id: req.params.id })
    .then(result => res.send(STATUS_CODE.SUCCESS_DELETE))
    .catch(err => handleException(err, res))
}


//HELPER FUNCTIONS

async function create(tweetParams) {
    const { _id, content, created,updated,postedBy } = tweetParams;
    const postedTweet = new Tweet({ _id, content, created,updated,postedBy });

    const newTweet = await postedTweet.save();
    if (newTweet) 
        return { ...STATUS_CODE.SUCCESS_ALL, newTweet };
return STATUS_CODE.FAILED_ACTION;

}

async function update(tweetId,updatedTweet){
    const newUpdatedTweet = await Tweet.findByIdAndUpdate(tweetId,updatedTweet);
    if(!newUpdatedTweet) return STATUS_CODE.BAD_REQUEST;
    return {...STATUS_CODE.SUCCESS_ALL, newUpdatedTweet}

}

// async function del(tweetId){
//     const deleteTweet= await Tweet.findByIdAndDelete(tweetId);
//     if(deleteTweet) return STATUS_CODE.NOT_FOUND;
//     return {...STATUS_CODE.SUCCESS_ALL}
// }

function handleException(error, res) {
    console.log(error.message)
    res.send(STATUS_CODE.INTERNAL_ERROR)
}
