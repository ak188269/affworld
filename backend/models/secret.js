const mongoose = require('mongoose');

const secretSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
    },
    secret : String,
});

module.exports = mongoose.model("secret", secretSchema);