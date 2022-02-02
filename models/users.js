const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: Schema.Types.String,
        required: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    }
}, {
    collection: "users",
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);