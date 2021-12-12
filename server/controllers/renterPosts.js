// path inside the require should not be "User" (1st letter capitalize)
// or we will have the following error:
// MongooseError [OverwriteModelError]: Cannot overwrite `User` model once compiled.
const User = require("../models/user");

const RenterPost = require("../models/renterPost");

let deleeeeeeeeeeeete_meeeeeeeeeeeee = "61b35367b2e9d8219ca9d833"; // user id

// prettier-ignore
module.exports = {
    find_All: async (req, res, next) => {
        try {
            console.log("\nRequesting the server to give me all RenterPost from the database ...\n");
            // the server will try the following
            const renterPosts = await RenterPost.find({});
            // Success
            console.log("Server Response: ");
            console.log("Found renterPosts: ", renterPosts, "\n");
            res.status(200).json(renterPosts);
        } catch (error) {
            next(error);
        }
    },
    create_A_New_One: async (req, res, next) => {
        // retreive the renterPost from the req.body & delete the userId attribute
        let renterPost = req.body;

        // save the id of the user
        let userId = renterPost.userId || deleeeeeeeeeeeete_meeeeeeeeeeeee; // I'm to lazy to send the user id from thunder client

        // delete the userId attribute, because we will add later the user attribute which hold the id object of the user
        delete renterPost.userId;

        try {
            console.log("\nRequesting the server to save a new renterPost into the database ...\n");

            // Find the user
            const foundUser = await User.findById(userId);

            // create a new renterPost into a database
            const newRenterPost = await RenterPost.create(renterPost);

            // Add the found user to the newRenterPost (followed the following guide:)
            // https://www.bezkoder.com/mongodb-many-to-many-mongoose/#Define_Mongoose_data_models
            /*********************************************** Bad Way ***********************************************
            newRenterPost.user = foundUser; // will not generate an error
            foundUser.renterPosts.push(newRenterPost) // => will cause an infinite recursive insertion problem
            // => console: RangeError: Maximum call stack size exceeded

            it's like doing the following:
            let array_1 = [], array_2 = []
            array_1.push(array_2)
            array_2.push(array_1) // <==== nested infinite circular array
            *********************************************** Good Way **********************************************/
            // update the user, by pushing newRenterPost._id (the id object, and not the string id) to renterPosts array
            let updatedUser = await User.findByIdAndUpdate(
                foundUser?._id,
                { $push: { renterPosts: newRenterPost?._id } },
                { new: true }
            ).populate("renterPosts");

            console.log("Server Response: ");
            console.log("Saved item: ", updatedUser, "\n");

            // update the RenterPost by setting the foundUser._id  (the id object, and not the string id) to user attribute
            let updatedRenterPost = await RenterPost.findByIdAndUpdate(
                newRenterPost?._id,
                { user: foundUser?._id },
                { new: true }
            ).populate("user");

            // Success
            console.log("Server Response: ");
            console.log("Saved item: ", updatedRenterPost, "\n");

            res.status(201).send(updatedRenterPost);
        } catch (error) {
            next(error);
        }
    },
    find_One: async (req, res, next) => {
        try {
            console.log("\nRequesting the server to give me a specific renterPost from the database ...\n");
            // the server will try the following
            const renterPost = await RenterPost.findById(
                req.params.renterPostId
            );
            // Success
            console.log("Server Response: ");
            console.log("Found renterPost: ", renterPost, "\n");
            res.status(200).json(renterPost);
        } catch (error) {
            next(error);
        }
    },
    update_One: async (req, res, next) => {
        let newRenterPost = req.body;
        try {
            console.log("\nRequesting the server to update a specific renterPost into the database ...\n");
            // the server will try the following
            const updatedRenterPost = await RenterPost.findByIdAndUpdate(
                req.params.renterPostId,
                newRenterPost,
                { new: true }
            );
            // Success
            console.log("Server Response: ");
            console.log("Updated RenterPost: ", updatedRenterPost, "\n");
            res.status(200).json(updatedRenterPost);
        } catch (error) {
            next(error);
        }
    },
    view_Plus_PLUS: async (req, res, next) => {
        try {
            const updatedRenterPost = RenterPost.findOneAndUpdate(
                { _id: req.params?._id },
                { $inc: { views: 1 } },
                { useFindAndModify: false, new: true }
            );
            res.status(201).json(updatedRenterPost)
        } catch (error) {
            next(error)
        }
    },
    remove_One: async (req, res, next) => {
        try {
            console.log("\nRequesting the server to delete a specific RenterPost from the database ...\n");
            // the server will try the following
            const removedRenterPost = await RenterPost.findByIdAndRemove(
                req.params.renterPostId
            );

            console.log("Server Response: ");
            console.log("Removed RenterPost: ", removedRenterPost, "\n");

            // Once the RenterPost has been removed, we must delete the id from the renterPosts of the user
            const updatedUser = await User.findByIdAndUpdate(
                removedRenterPost?.user?._id,
                { $pull: { renterPosts: removedRenterPost?._id } },
                { new: true }
            ).populate("renterPosts");

            console.log("Server Response: ");
            console.log("Updated updatedUser: ", updatedUser, "\n");

            // Success
            res.status(200).json(removedRenterPost);
        } catch (error) {
            next(error);
        }
    },
};
