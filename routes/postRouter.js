const { Router } = require("express");
const { getPostById } = require("../posts");
const postRouter = Router();

// No controller version
// postRouter.get("/:postId", (req, res) => {
//   const { postId } = req.params;
//   const post = getPostById(postId);
//   res.render("post", { post });
// });

// Logic in controller
postRouter.get("/:postId", getPostById);

module.exports = postRouter;
