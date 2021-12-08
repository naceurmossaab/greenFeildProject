var express = require("express");
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var items = require("../database-mongo");
const router = require("./routers/router.js");

var app = express();
app.use(express.json());
// app.use(urlencoded({}))
app.use(express.static(__dirname + "/../react-client/dist"));

app.use("/api", router);

app.listen(5000, function () {
	console.log("listening on port http://localhost:5000 !");
});
