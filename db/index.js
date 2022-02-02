const mongoose = require("mongoose");

const username = process.env.DB_USERNAME;
const passeord = process.env.DB_PASSWORD;

mongoose.connect(`mongodb+srv://laravelcrystal:laravelcrystal123@cluster0.oryu7.mongodb.net/react-app?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose.connection;