const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter a username"],
            unique: [
                true,
                "There's already an account registered with that username",
            ],
            lowercase: true,
        },
        fullname: {
            type: String,
            required: [true, "Please enter a your First and last name"],
        },
        connected: { type: Boolean, default: false },
        email: {
            type: String,
            required: [true, "Please enter an email"],
            lowercase: true,
            validate: [isEmail, "Please enter a valid email"],
        },
        phone_number: {
            type: String,
            required: [true, "Please enter your phone number"],
        },
        password: {
            type: String,
            required: [true, "Please enter a password"],
            minlength: [6, "Minimum password length is 8 characters"],
        },
        category: {
            type: String,
            required: [true, 'Are you "Owner" or "Renter" ?'],
            lowercase: true,
        },
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

userSchema.statics.login = async function (username, plainTextPassword) {
    const foundUser = await this.findOne({ username });
    if (foundUser) {
        const success = await bcrypt.compare(
            plainTextPassword,
            foundUser.password
        );
        if (success) {
            return foundUser;
        }
        throw Error("Incorrect password");
    }
    throw Error("Incorrect username");
};

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model("User", userSchema);
