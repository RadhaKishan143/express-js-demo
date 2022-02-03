const express = require("express");
const Router = express.Router();
const VariantCtrl = require("../controllers/variant");

Router.post("/variant", VariantCtrl.createVariant);

module.exports = Router;