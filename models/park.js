var mongoose = require("mongoose");

// schema setup
var parkSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    location: String,
    lat: Number,
    lng: Number,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ]
});
var Park = mongoose.model("Park", parkSchema);
module.exports = Park;