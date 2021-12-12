const express = require("express");
const router = express.Router();

const RenterPostsController = require("../controllers/renterPosts");

// prettier-ignore
router.route("/")
    .get(RenterPostsController.find_All)
    .post(RenterPostsController.create_A_New_One)

// prettier-ignore
router.route("/:renterPostId")
    .get(RenterPostsController.find_One)
    .put(RenterPostsController.update_One)
    .patch(RenterPostsController.view_Plus_PLUS)
    .delete(RenterPostsController.remove_One)

module.exports = router;
