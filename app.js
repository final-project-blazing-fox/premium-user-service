const express = require("express");
const app = express();
const router = require("./router");
const cors = require("cors");
const errHandler = require("./helper/error");
var params = require("strong-params");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(params.expressMiddleware());
app.use(router);
app.use(errHandler);

module.exports = app;
