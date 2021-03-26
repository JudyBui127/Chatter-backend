var mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: String,
    required: true,
    created: Date,
    updated: Date,
    postedBy: {type: Schema.ObjectId, ref:'UserSchema'},
    index: true
})

module.exports = mongoose.model("tweets",tweetSchema) ;
