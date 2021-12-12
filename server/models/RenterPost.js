const mongoose = require("mongoose");

const renterPostSchema = mongoose.Schema(
    {
        label: { type: String, default: "Not Specified" },
        description: { type: String, default: "Not Specified" },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { versionKey: false } // to not save the __v attribute ... // Source: https://mongoosejs.com/docs/guide.html#versionKey
);

module.exports = mongoose.model("RenterPost", renterPostSchema);
