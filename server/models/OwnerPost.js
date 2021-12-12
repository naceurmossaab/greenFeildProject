const mongoose = require("mongoose");

const ownerPostSchema = mongoose.Schema(
    {
        // label: { type: String, default: "Not Specified" },
        adress: {
            type: String,
            default: "Not Specified",
        },
        description: {
            type: String,
            default: "Not Specified",
        },
        numberOfRooms: {
            type: Number,
            default: 1,
        },
        pictures: [
            {
                type: String,
                default: "",
            },
        ],
        price: {
            type: Number,
            default: 0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        createdAt: {
            type: Date,
            immutable: true,
            default: () => Date.now(),
        },
        updatedAt: {
            type: Date,
            default: () => Date.now(),
        },
    },
    { versionKey: false } // to not save the __v attribute ... // Source: https://mongoosejs.com/docs/guide.html#versionKey
);

module.exports = mongoose.model("OwnerPost", ownerPostSchema);
