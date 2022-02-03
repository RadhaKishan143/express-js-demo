const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const variantSchema = new Schema({
    title: {
        type: Schema.Types.String,
    },
}, {
    collection: "variants"
});

module.exports = mongoose.model("Variant", variantSchema);