// path inside the require should not be "User" (1st letter capitalize)
// or we will have the following error:
// MongooseError [OverwriteModelError]: Cannot overwrite `User` model once compiled.
const User = require("../models/user");

const bcrypt = require("bcrypt");

module.exports = {
    signin: async (req, res, next) => {
        let user = {
            username: req.body?.login,
            password: req.body?.password,
        };

        for (let key in user) {
            if (user[key] === "") {
                delete user[key];
            }
        }

        try {
            let filter = { username: user.username };
            let foundUser = await User.findOne(filter);
            // if the user === null
            if (foundUser === null) {
                res.json(foundUser);
            } else {
                res.json(foundUser);
            }
        } catch (error) {
            console.log(error);
        }
    },
    signup: async (req, res, next) => {
        let user = {
            username: req.body?.username,
            fullname: req.body?.fullname,
            email: req.body?.email,
            phone_number: req.body?.phone_number,
            category: req.body?.category,
            password: req.body?.password,
        };

        for (let key in user) {
            if ([undefined, ""].includes(user[key])) {
                delete user[key];
            }
        }

        // I put this if condition, for test purpose
        // I have to make sure that the username is filled
        // that's why I deleted the "" & undefined value
        if (!user.username) {
            user.username = Math.random() * 10 ** 20;
        }
        try {
            let filter = { username: user.username };
            let foundUser = await User.findOne(filter);

            // if the user does not exist inside the database
            if (foundUser === null) {
                // then save him inside the database
                let createdUser = await User.create(user);
                let savedUser = await createdUser.save();
                res.json(savedUser);
            } else {
                res.send("username taken");
            }
        } catch (error) {
            console.log(error);
        }
    },
    logout: async (req, res, next) => {
        // logout
    },
};
