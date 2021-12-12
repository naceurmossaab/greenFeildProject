var mongoose = require("mongoose");
<<<<<<< HEAD
mongoose.connect("mongodb://localhost/greenfield-project", {
    useMongoClient: true,
});
=======
mongoose.connect("mongodb://localhost/test");
>>>>>>> 07226bc9ef75105e12b04217c2155dc05498650b

var db = mongoose.connection;

db.on("error", function () {
<<<<<<< HEAD
    console.log("mongoose connection error");
});

db.once("open", function () {
    console.log("mongoose connected successfully");
});

var itemSchema = mongoose.Schema({
    quantity: Number,
    description: String,
});
=======
	console.log("mongoose connection error");
});

db.once("open", function () {
	console.log("mongoose connected successfully");
});

var itemSchema = mongoose.Schema(
	{
		userID: String,
		categorie: String,
		details: Object,
	},
	{
		timestamps: true,
	}
);
>>>>>>> 07226bc9ef75105e12b04217c2155dc05498650b

var Item = mongoose.model("Item", itemSchema);

var selectAll = function (callback) {
<<<<<<< HEAD
    Item.find({}, function (err, items) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, items);
        }
    });
=======
	Item.find({}, function (err, items) {
		if (err) {
			callback(err, null);
		} else {
			callback(null, items);
		}
	});
>>>>>>> 07226bc9ef75105e12b04217c2155dc05498650b
};

module.exports.selectAll = selectAll;
