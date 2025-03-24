const express = require("express");
const app = express();
const threadRouter = require("./routes/threadRouter");
const postRouter = require("./routes/postRouter");
const indexRouter = require("./routes/indexRouter");
const path = require("node:path");
const PORT = process.env.PORT || 3000;

app.set("trust proxy", "8.8.8.8");

// Use views from ejs files in `views` folder
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Use assets from `public` folder
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use("/", indexRouter); // Home and new
app.use("/:threadId/replies/:postId", postRouter); // Individual replies
app.use("/:threadId", threadRouter); // Show thread

// 4 arguments denotes error handler
app.use((err, req, res, next) => {
  console.error(err);
  // We can now specify the `err.statusCode` that exists in our custom error class and if it does not exist it's probably an internal server error
  res.status(err.statusCode || 500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`MiniBBS - listening on port ${PORT}!`);
});
