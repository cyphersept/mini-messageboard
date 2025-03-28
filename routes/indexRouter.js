const { Router } = require("express");
const { readJson } = require("../controllers/dataController");
const indexRouter = Router();

// const { threads, posts } = readJson("../public/data.json", (err, data) => {
//   // if data.threads or data.posts isn't an array of IDs, throw error
//   done(err);
// });

indexRouter.get("/new", (req, res, next) => {
  // Look for file named index in views folder defined in app.js
  res.render("new", { title: "Create new thread" });
  next();
});

indexRouter.get("/", async (req, res, next) => {
  const data = await readJson("../data/threads.json");
  const threads = data || [];
  console.log(threads);
  // Look for file named index in views folder defined in app.js
  res.render("index", { threads: threads });
  next();
});

// indexRouter.get("/about", (req, res, next) => {
//   // Look for file named about in views folder defined in app.js
//   res.render("about", {
//     message: "Site built with EJS templating.",
//     links: links,
//     name: "cyphersept",
//   });
//   next();
// });

module.exports = indexRouter;
