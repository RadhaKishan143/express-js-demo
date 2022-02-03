const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = new Schema({
    username: {
        type: Schema.Types.String,
        required: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    variants: [
        {
            type: Schema.Types.ObjectId,
            ref: "Variant"
        }
    ]
}, {
    collection: "users",
    timestamps: true
});

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", userSchema);