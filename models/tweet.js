var mongoose = require("mongoose");
// var validate = require("mongoose-validator");
const Schema = mongoose.Schema;
const User = require('./user');
// var contentValidate=[
//     validate({
//     arguments:[0,399],
//     message:'Tweet should be no more than 399 characters'
// })];
const tweetSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    content: String,
    created: Date,
    updated: Date,
    postedBy: {ref:'User', type: Schema.Types.ObjectId},
    // validate: contentValidate
})

module.exports = mongoose.model('Tweet',tweetSchema) ;
