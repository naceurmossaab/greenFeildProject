const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

// prettier-ignore
router.route("/")
    .get(UsersController.find_All)
    .post(UsersController.create_A_New_One) // will be used from the interface of the admin
// .put(UsersController.update); // to ban, unban, lock account, etc ...

// prettier-ignore
router.route("/:userId")
    .get(UsersController.find_One) // user can read data of a specific user
    .put(UsersController.update_One) // user can update his own account
    .delete(UsersController.remove_One) // user can delete his own account

// prettier-ignore
router.route("/:userId/ownerposts")
    .get(UsersController.find_All_OwnerPosts_of_Specific_User)
    .post(UsersController.create_One_OwnerPost_of_Specific_User)
    .delete(UsersController.remove_All_OwnerPosts_of_Specific_User)

// prettier-ignore
router.route("/:userId/ownerposts/:ownerpostId")
    .get(UsersController.find_One_OwnerPost_of_Specific_User)
    .put(UsersController.update_One_OwnerPost_of_Specific_User)
    .delete(UsersController.remove_One_OwnerPost_of_Specific_User)

// prettier-ignore
router.route("/:userId/renterposts")
    .get(UsersController.find_All_RenterPosts_of_Specific_User)
    .post(UsersController.create_One_RenterPost_of_Specific_User)
    .delete(UsersController.remove_All_RenterPosts_of_Specific_User)

// prettier-ignore
router.route("/:userId/renterposts/:renterpostId")
    .get(UsersController.find_One_RenterPost_of_Specific_User)
    .put(UsersController.update_One_RenterPost_of_Specific_User)
    .delete(UsersController.remove_One_RenterPost_of_Specific_User)

module.exports = router;
