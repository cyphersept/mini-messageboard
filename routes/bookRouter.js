const { Router } = require("express");

const bookRouter = Router();

bookRouter.get("/", (req, res) => res.send("All books"));
bookRouter.get("/:bookId", (req, res) => {
  const { bookId } = req.params;
  res.send(`Author ID: ${bookId}`);
});

module.exports = bookRouter;
