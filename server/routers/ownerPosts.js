const express = require("express");
const router = express.Router();

const OwnerPostsController = require("../controllers/ownerPosts");

// prettier-ignore
router.route("/")
    .get(OwnerPostsController.find_All)
    .post(OwnerPostsController.create_A_New_One)

// prettier-ignore
router.route("/:ownerPostId")
    .get(OwnerPostsController.find_One)
    .put(OwnerPostsController.update_One)
    .patch(OwnerPostsController.view_Plus_PLUS)
    .delete(OwnerPostsController.remove_One)

module.exports = router;
