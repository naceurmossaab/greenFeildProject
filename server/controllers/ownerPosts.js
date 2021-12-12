// path inside the require should not be "User" (1st letter capitalize)
// or we will have the following error:
// MongooseError [OverwriteModelError]: Cannot overwrite `User` model once compiled.
const User = require("../models/user");

const OwnerPost = require("../models/ownerPost");

let deleeeeeeeeeeeete_meeeeeeeeeeeee = "61b35367b2e9d8219ca9d833"; // user id

// prettier-ignore
module.exports = {
    find_All: async (req, res, next) => {
        try {
            console.log("\nRequesting the server to give me all ownerPosts from the database ...\n");
            // the server will try the following
            const ownerPosts = await OwnerPost.find({}).populate("user");
            // Success
            console.log("Server Response: ");
            console.log("Found ownerPosts: ", ownerPosts, "\n");
            res.status(200).json(ownerPosts);
        } catch (error) {
            next(error);
        }
    },
    create_A_New_One: async (req, res, next) => {
        // retreive the ownerPost from the req.body & delete the userId attribute
        let ownerPost = req.body;

        // save the id of the user
        let userId = ownerPost.userId || deleeeeeeeeeeeete_meeeeeeeeeeeee; // I'm to lazy to send the user id from thunder client

        // delete the userId attribute, because we will add later the user attribute which hold the id object of the user
        delete ownerPost.userId;

        try {
            console.log("\nRequesting the server to save a new ownerPost into the database ...\n");

            // Find the user
            const foundUser = await User.findById(userId);

            // create a new ownerPost into a database
            const newOwnerPost = await OwnerPost.create(ownerPost);

            // Add the found user to the newOwnerPost (followed the following guide:)
            // https://www.bezkoder.com/mongodb-many-to-many-mongoose/#Define_Mongoose_data_models
            /*********************************************** Bad Way ***********************************************
            newOwnerPost.user = foundUser; // will not generate an error
            foundUser.ownerPosts.push(newOwnerPost) // => will cause an infinite recursive insertion problem
            // => console: RangeError: Maximum call stack size exceeded

            it's like doing the following:
            let array_1 = [], array_2 = []
            array_1.push(array_2)
            array_2.push(array_1) // <==== nested infinite circular array
            *********************************************** Good Way **********************************************/
            // update the user, by pushing newOwnerPost._id (the id object, and not the string id) to ownerPosts array
            let updatedUser = await User.findByIdAndUpdate(
                foundUser?._id,
                { $push: { ownerPosts: newOwnerPost?._id } },
                { new: true }
            ).populate("ownerPosts");

            console.log("Server Response: ");
            console.log("Updated User: ", updatedUser, "\n");

            // update the OwnerPost by setting the foundUser._id  (the id object, and not the string id) to user attribute
            let updatedOwnerPost = await OwnerPost.findByIdAndUpdate(
                newOwnerPost?._id,
                { user: foundUser?._id },
                { new: true }
            ).populate("user");

            // Success
            console.log("Server Response: ");
            console.log("Updated item: ", updatedOwnerPost, "\n");

            res.status(201).send(updatedOwnerPost);
        } catch (error) {
            next(error);
        }
    },
    find_One: async (req, res, next) => {
        try {
            console.log("\nRequesting the server to give me a specific ownerPost from the database ...\n");
            // the server will try the following
            const ownerPost = await OwnerPost.findById(req.params.ownerPostId);
            // Success
            console.log("Server Response: ");
            console.log("Found ownerPost: ", ownerPost, "\n");
            res.status(200).json(ownerPost);
        } catch (error) {
            next(error);
        }
    },
    update_One: async (req, res, next) => {
        try {
            console.log("\nRequesting the server to update a specific ownerPost into the database ...\n");
            // the server will try the following
            const updatedOwnerPost = await OwnerPost.findByIdAndUpdate(
                req.params.ownerPostId,
                req.body,
                { new: true }
            );
            // Success
            console.log("Server Response: ");
            console.log("Updated OwnerPost: ", updatedOwnerPost, "\n");
            res.status(200).json(updatedOwnerPost);
        } catch (error) {
            next(error);
        }
    },
    view_Plus_PLUS: async (req, res, next) => {
        try {
            const updatedOwnerPost = OwnerPost.findOneAndUpdate(
                { _id: req.params?._id },
                { $inc: { views: 1 } },
                { useFindAndModify: false, new: true }
            );
            res.status(201).json(updatedOwnerPost)
        } catch (error) {
            next(error)
        }
    },
    remove_One: async (req, res, next) => {
        try {
            console.log("\nRequesting the server to delete a specific OwnerPost from the database ...\n");
            // the server will try the following
            const removedOwnerPost = await OwnerPost.findByIdAndRemove(
                req.params.ownerPostId
            );

            console.log("Server Response: ");
            console.log("Deleted OwnerPost: ", removedOwnerPost, "\n");

            // Once the OwnerPost has been removed, we must delete the id from the ownerPosts of the user
            const updatedUser = await User.findByIdAndUpdate(
                removedOwnerPost?.user?._id,
                { $pull: { ownerPosts: removedOwnerPost?._id } },
                { new: true }
            ).populate("ownerPosts");

            console.log("Server Response: ");
            console.log("Updated updatedUser: ", updatedUser, "\n");

            // Success
            res.status(200).json(removedOwnerPost);
        } catch (error) {
            next(error);
        }
    },
};
