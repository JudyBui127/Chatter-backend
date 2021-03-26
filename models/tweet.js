var mongoose = require("mongoose");
var validate = require("mongoose-validator");
var contentValidate=[
    validate({
    arguments:[0,399],
    message:'Tweet should be no more than 399 characters'
})];
const tweetSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    content: String,
    required: true,
    created: Date,
    updated: Date,
    postedBy: {type: Schema.ObjectId, ref:'UserSchema'},
    // validate: contentValidate
})

module.exports = mongoose.model("tweets",tweetSchema) ;
