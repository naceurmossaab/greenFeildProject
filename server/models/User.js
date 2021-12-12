const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
    {
        username: { type: String, default: "Not Specified", unique: true },
        fullname: { type: String, default: "Not Specified" },
        connected: { type: Boolean, default: false },
        email: { type: String, default: "Not Specified" },
        phone_number: { type: String, default: "Not Specified" },
        password: { type: String, default: "Not Specified" },
        // salt: { type: String, default: "Not Specified" },
        category: { type: String, default: "Not Specified" },
        profile_image_uri: { type: String },
        ownerPosts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "OwnerPost",
            },
        ],
        renterPosts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "RenterPost",
            },
        ],
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

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.post("save", function (user, next) {
    console.log("Server Response: ");
    console.log("Saved user: ", user, "\n");
    next();
});

userSchema.post("update", function (user, next) {
    console.log("Server Response: ");
    console.log("Updated user: ", user, "\n");
    next();
});

userSchema.post("remove", function (user, next) {
    console.log("Server Response: ");
    console.log("Removed user: ", user, "\n");
    next();
});

module.exports = mongoose.model("User", userSchema);
