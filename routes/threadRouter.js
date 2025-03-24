const { Router } = require("express");
const { getThreadById } = require("../threads");
const postRouter = Router();

postRouter.get("/:threadId", (req, res) => {
  const { threadId } = req.params;
  const thread = getThreadById(threadId);
  res.render("thread", { thread });
});

module.exports = postRouter;
