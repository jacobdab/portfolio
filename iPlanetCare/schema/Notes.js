const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
    text: String,
    author:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        },
        username: String},
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Notes',NotesSchema);