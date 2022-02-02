const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
dotenv.config();

const db = require("./db");
const UserRouter = require("./routes/users");

const handleServerError = require("./utils/errorHandler")

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
   res.send("Hello...");
});

app.use("/api", UserRouter);

app.use(handleServerError);

app.listen(8000, () => {
    console.log("React backend is running on 8000");
});