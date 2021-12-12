// path inside the require should not be "User" (1st letter capitalize)
// or we will have the following error:
// MongooseError [OverwriteModelError]: Cannot overwrite `User` model once compiled.
const User = require("../models/user");

const OwnerPost = require("../models/ownerPost");
const RenterPost = require("../models/renterPost");
const bcrypt = require("bcrypt");

// prettier-ignore
module.exports = {
    find_All: async (req, res, next) => {
        // get all the users
        try {
            console.log("\nRequesting the server to give me all users from the database ...\n");
            // the server will try the following
            const users = await User
                                .find({})
                                .populate(["renterPosts","ownerPosts"]);

            // Success
            console.log("Server Response: ");
            console.log("Found users: ", users, "\n");
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    },
    create_A_New_One: async (req, res, next) => { // ONLY USED BY ADMIN !!!!!
        // the admin will be able to create a new user, but the password will be generated randomly then hashed
        try {
            console.log("\nRequesting the server to save user into the database ...\n");

            let newUser = req.body;
            let salt = await bcrypt.genSalt(10);
            let hashed_password = await bcrypt.hash(`${Math.random() * 10 ** 20}`, salt);
            newUser.password = hashed_password;
            // https://mongoosejs.com/docs/models.html#constructing-documents
            const savedUser = await User.create(newUser);

            // Success
            console.log("Server Response: ");
            console.log("Saved user: ", savedUser, "\n");
            res.status(201).json(savedUser);
        } catch (error) {
            res.status(201).json(error); // must send to the user that the username is already taken
            // next(error);
        }
    },
    find_One: async (req, res, next) => {
        try {
            console.log("\nRequesting the server to give me a specific user from the database ...\n");
            // the server will try the following
            const foundUser = await User
                                    .findById(req.params.userId)
                                    .populate(["renterPosts","ownerPosts"]);

            // Success
            console.log("Server Response: ");
            console.log("Found user: ", foundUser, "\n");

            res.status(200).json(foundUser);
        } catch (error) {
            next(error);
        }
    },
    update_One: async (req, res, next) => {
        try {
            console.log("\nRequesting the server to update a specific user into the database ...\n");
            // the server will try the following
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                req.body,
                { new: true }
            ).populate(["renterPosts","ownerPosts"])
            // Success
            console.log("Server Response: ");
            console.log("Updated user: ", user, "\n");
            res.status(200).json(user)
        } catch (error) {
            next(error);
        }
    },
    remove_One: async (req, res, next) => {
        try {
            console.log("\nRequesting the server to delete a specific user from the database ...\n");
            // the server will try the following
            const removedUser = await User.findByIdAndRemove(req.params.userId).populate(["renterPosts","ownerPosts"])

            // Success
            console.log("Server Response: ")
            console.log("Removed user: ", removedUser, "\n")

            let removedOwnerPost;
            for(let ownerPost of removedUser.ownerPosts){
                removedOwnerPost = await OwnerPost.findByIdAndRemove(ownerPost._id)

                console.log("Server Response: ")
                console.log("Removed ownerPost: ", removedOwnerPost, "\n")
            }

            let removedRenterPost;
            for(let renterPost of removedUser.renterPosts){
                removedRenterPost = await RenterPost.findByIdAndRemove(renterPost._id)

                console.log("Server Response: ")
                console.log("Removed renterPost: ", removedRenterPost, "\n")
            }

            res.status(200).json(removedUser)
        } catch (error) {
            next(error)
        }
    },
    find_All_OwnerPosts_of_Specific_User: async (req, res, next) => {
        try {
            console.log("\nRequesting the server to find all ownerPosts of a specific user from the database ...\n");
            // the server will try the following
            const user = await User.findById(req.params.userId).populate("ownerPosts");
            // Success
            console.log("Server Response: ");
            console.log("Found ownerPosts: ", user.ownerPosts, "\n");
            res.status(200).json(user.ownerPosts);
        } catch (error) {
            next(error);
        }
    },
    create_One_OwnerPost_of_Specific_User: async (req, res, next) => {
        // retreive the ownerPost from the req.body & delete the userId attribute
        let ownerPost = req.body;

        // save the id of the user
        let userId = ownerPost.userId || req.params.userId;

        // delete the userId attribute, because we will add later the user attribute which hold the id object of the user
        delete ownerPost.userId;
        try {
            console.log("\nRequesting the server to create and save a new ownerPost, of a specific user, inside the database ...\n");
            // the server will try the following:
            // Step 1: Find the user
            const foundUser = await User.findById(userId);

            // Success:
            console.log("Server Response: ");
            console.log("user: ", foundUser, "\n");

            // Create a new ownerPost into a database
            const newOwnerPost = await OwnerPost.create(ownerPost);

            console.log("Server Response: ");
            console.log("newOwnerPost: ", newOwnerPost, "\n");

            // Add the found user to the newOwnerPost
            // update the user, by pushing newOwnerPost._id (the id object, and not the string id) to ownerPosts array
            let updatedUser = await User.findByIdAndUpdate(
                foundUser?._id,
                { $push: { ownerPosts: newOwnerPost?._id } },
                { new: true }
            ).populate(["ownerPosts","renterPosts"]);

            console.log("Server Response: ");
            console.log("updatedUser: ", updatedUser, "\n");

            // update the OwnerPost by setting the foundUser._id  (the id object, and not the string id) to user attribute
            let updatedOwnerPost = await OwnerPost.findByIdAndUpdate(
                newOwnerPost?._id,
                { user: foundUser._id },
                { new: true }
            ).populate("user");

            console.log("Server Response: ");
            console.log("updatedOwnerPost: ", updatedOwnerPost, "\n");

            res.status(201).json(updatedOwnerPost);
        } catch (error) {
            next(error);
        }
    },
    remove_All_OwnerPosts_of_Specific_User: async (req, res, next) => {
        try {
            console.log("\nRequesting the server to delete all owerPosts, of a specific user, from the database ...\n");
            // the server will try the following
            const foundUser = await User
                                    .findById(req.params.userId)
                                    .populate(["renterPosts","ownerPosts"])

            console.log("Server Response: ")
            console.log("Found user: ", foundUser, "\n")

            let removedOwnerPost, updatedUser
            for(let ownerPost of removedUser.ownerPosts){
                removedOwnerPost = await OwnerPost.findByIdAndRemove(ownerPost._id)

                console.log("Server Response: ")
                console.log("Removed ownerPost: ", removedOwnerPost, "\n")

                updatedUser = await User.findByIdAndUpdate(
                    foundUser?._id,
                    { $pull: { ownerPosts: removedOwnerPost?._id } },
                    { new: true }
                ).populate("renterPosts"); // no need to populate with ownerPosts since all of them are removed

                console.log("Server Response: ");
                console.log("Updated updatedUser: ", updatedUser, "\n");
            }

            res.status(201).json(updatedUser)
        } catch (error) {
            next(error)
        }
    },
    find_One_OwnerPost_of_Specific_User: async (req, res, next) => {
        try {
            console.log("\nRequesting the server to find a specific ownerPost, of a specific user, from the database ...\n");
            // the server will try the following
            const foundUser = await User
                                    .findById(req.params.userId)
                                    .populate(["renterPosts","ownerPosts"])

            console.log("Server Response: ")
            console.log("Found user: ", foundUser, "\n")

            let foundOwnerPost = await OwnerPost.findById(req.params.ownerpostId)

            console.log("Server Response: ")
            console.log("Found ownerPost: ", foundOwnerPost, "\n")


            res.status(200).json(foundOwnerPost)
        } catch (error) {
            next(error)
        }
    },
    update_One_OwnerPost_of_Specific_User: async (req, res, next) => {
        try {
            console.log("\nRequesting the server to update a specific ownerPost, of a specific user, from the database ...\n");
            // the server will try the following
            const foundUser = await User
                                    .findById(req.params.userId)
                                    .populate(["renterPosts","ownerPosts"])

            console.log("Server Response: ")
            console.log("Found user: ", foundUser, "\n")

            let updatedOwnerPost = await OwnerPost.findByIdAndUpdate(req.params.ownerpostId)

            console.log("Server Response: ")
            console.log("Updated ownerPost: ", updatedOwnerPost, "\n")

            res.status(201).json(updatedOwnerPost)
        } catch (error) {
            next(error)
        }
    },
    remove_One_OwnerPost_of_Specific_User: async (req, res, next) => {
        try {
            console.log("\nRequesting the server to delete a specific ownerPost, of a specific user, from the database ...\n");
            // the server will try the following
            const foundUser = await User
                                    .findById(req.params.userId)
                                    .populate(["renterPosts","ownerPosts"])

            console.log("Server Response: ")
            console.log("Found user: ", foundUser, "\n")

            let removedOwnerPost = await OwnerPost.findByIdAndRemove(req.params.ownerpostId)

            console.log("Server Response: ")
            console.log("Removed ownerPost: ", removedOwnerPost, "\n")

            updatedUser = await User.findByIdAndUpdate(
                foundUser?._id,
                { $pull: { ownerPosts: removedOwnerPost?._id } },
                { new: true }
            ).populate(["ownerPosts","renterPosts"]);

            console.log("Server Response: ");
            console.log("Updated updatedUser: ", updatedUser, "\n");

            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)
        }
    },
    find_All_RenterPosts_of_Specific_User: async (req, res, next) => {
        try {
            console.log("\nRequesting the server to find all renterPosts, of a specific user, from the database ...\n");
            // the server will try the following
            const user = await User.findById(req.params.userId).populate("renterPosts")
            // Success
            console.log("Server Response: ");
            console.log("Found ownerPosts: ", user.ownerPosts, "\n");
            res.status(200).json(user.renterPosts);
        } catch (error) {
            next(error);
        }
    },
    create_One_RenterPost_of_Specific_User: async (req, res, next) => {
        // retreive the ownerPost from the req.body & delete the userId attribute
        let renterPost = req.body;

        // save the id of the user
        let userId = renterPost.userId || req.params.userId;

        // delete the userId attribute, because we will add later the user attribute which hold the id object of the user
        delete renterPost.userId;
        try {
            console.log("\nRequesting the server to save and create a new renterPost, of a specific user, inside the database ...\n");
            // the server will try the following:
            // Step 1: Find the user
            const foundUser = await User.findById(userId);

            // Success:
            console.log("Server Response: ");
            console.log("foundUser: ", foundUser, "\n");

            // Create a new ownerPost into a database
            const newRenterPost = await RenterPost.create(renterPost);

            console.log("Server Response: ");
            console.log("newRenterPost: ", newRenterPost, "\n");

            // Add the found user to the newOwnerPost
            // update the user, by pushing newOwnerPost._id (the id object, and not the string id) to ownerPosts array
            let updatedUser = await User.findByIdAndUpdate(
                foundUser?._id,
                { $push: { renterPosts: newRenterPost?._id } },
                { new: true }
            ).populate(["renterPosts", "ownerPosts"]);

            console.log("Server Response: ");
            console.log("updatedUser: ", updatedUser, "\n");

            // update the OwnerPost by setting the foundUser._id  (the id object, and not the string id) to user attribute
            let updatedRenterPost = await RenterPost.findByIdAndUpdate(
                newRenterPost?._id,
                { user: foundUser?._id },
                { new: true }
            ).populate("user");

            console.log("Server Response: ");
            console.log("updatedRenterPost: ", updatedRenterPost, "\n");

            res.status(201).json(updatedRenterPost);
        } catch (error) {
            next(error);
        }
    },
    remove_All_RenterPosts_of_Specific_User: async (req, res, next) => {
        try {
            console.log("\nRequesting the server to delete all renterPosts, of a specific user, from the database ...\n");
            // the server will try the following
            const foundUser = await User.findById(req.params.userId).populate(["renterPosts","ownerPosts"])

            console.log("Server Response: ")
            console.log("Found user: ", foundUser, "\n")

            let removedRenterPost, updatedUser;
            for(let renterPost of removedUser.renterPosts){
                removedRenterPost = await RenterPost.findByIdAndRemove(renterPost._id)

                console.log("Server Response: ")
                console.log("Removed renterPost: ", removedRenterPost, "\n")

                updatedUser = await User.findByIdAndUpdate(
                    foundUser?._id,
                    { $pull: { renterPosts: removedRenterPost?._id } },
                    { new: true }
                ).populate("ownerPosts");  // no need to populate with renterPosts since all of them are removed

                console.log("Server Response: ");
                console.log("Updated updatedUser: ", updatedUser, "\n");
            }

            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)
        }
    },
    find_One_RenterPost_of_Specific_User: async (req, res, next) => {
        try {
            console.log("\nRequesting the server to find a specific renterPost, of a specific user, from the database ...\n");
            // the server will try the following
            const foundUser = await User
                                    .findById(req.params.userId)
                                    .populate(["renterPosts","ownerPosts"])

            console.log("Server Response: ")
            console.log("Found user: ", foundUser, "\n")

            let foundRenterPost = await RenterPost.findById(req.params.renterpostId)

            console.log("Server Response: ")
            console.log("Found renterPost: ", foundRenterPost, "\n")

            res.status(200).json(foundRenterPost)
        } catch (error) {
            next(error)
        }
    },
    update_One_RenterPost_of_Specific_User: async (req, res, next) => {
        let newRenterPost = req.body
        try {
            console.log("\nRequesting the server to update a specific renterPost, of a specific user, from the database ...\n");
            // the server will try the following
            const foundUser = await User
                                    .findById(req.params.userId)
                                    .populate(["renterPosts","ownerPosts"])

            console.log("Server Response: ")
            console.log("Found user: ", foundUser, "\n")

            let updatedRenterPost = await RenterPost.findByIdAndUpdate(
                req.params.renterpostId,
                newRenterPost,
                { new: true }
            )

            console.log("Server Response: ")
            console.log("Updated renterPost: ", updatedRenterPost, "\n")

            res.status(201).json(updatedRenterPost)
        } catch (error) {
            next(error)
        }
    },
    remove_One_RenterPost_of_Specific_User: async (req, res, next) => {
        try {
            console.log("\nRequesting the server to remove all renterPosts, of a specific user, from the database ...\n");
            // the server will try the following
            const foundUser = await User.findById(req.params.userId).populate(["renterPosts","ownerPosts"])

            console.log("Server Response: ")
            console.log("Found user: ", foundUser, "\n")

            let removedRenterPost = await RenterPost.findByIdAndRemove(req.params.renterpostId)

            console.log("Server Response: ")
            console.log("Removed renterPost: ", removedRenterPost, "\n")

            updatedUser = await User.findByIdAndUpdate(
                foundUser?._id,
                { $pull: { renterPosts: removedRenterPost?._id } },
                { new: true }
            ).populate("renterPosts");

            console.log("Server Response: ");
            console.log("Updated updatedUser: ", updatedUser, "\n");

            res.status(201).json(updatedUser)
        } catch (error) {
            next(error)
        }
    },
};
