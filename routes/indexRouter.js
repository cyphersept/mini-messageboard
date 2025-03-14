const { Router } = require("express");
const indexRouter = Router();
const links = [
  { href: "/", text: "Home" },
  { href: "about", text: "About" },
  { href: "authors/1", text: "Author 1" },
  { href: "authors/2", text: "Author 2" },
  { href: "authors/3", text: "Author 3" },
];
const users = ["Rose", "Cake", "Biff"];

indexRouter.get("/", (req, res, next) => {
  // Look for file named index in views folder defined in app.js
  res.render("index", { message: "EJS rocks!", links: links, users: users });
  next();
});
indexRouter.get("/about", (req, res, next) => {
  // Look for file named about in views folder defined in app.js
  res.render("about", {
    message: "Site built with EJS templating.",
    links: links,
    name: "cyphersept",
  });
  next();
});

module.exports = indexRouter;
