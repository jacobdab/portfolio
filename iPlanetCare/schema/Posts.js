const mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose'),
    Devices = require('./Devices'),
    User = require('./Users');


const PostsSchema = new mongoose.Schema({
    post : String,
    type: String,
    author: {
       id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'User'},
       username: String
    },
    createdAt: {
       type: Date,
       default: Date.now()
    }
});

PostsSchema.index({
    createdAt : 'text',
    username : 'text',
    post : 'text',
    type: 'text'
});

module.exports = mongoose.model('Posts',PostsSchema);