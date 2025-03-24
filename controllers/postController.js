const { nanoid } = require("nanoid");
const { readJson, writeJson } = require("./dataController");
const asyncHandler = require("express-async-handler");
const CustomNotFoundError = require("../errors/CustomNotFoundError");
const postsPath = "../data/posts.json";

const posts = [];

const postFactory = (body, poster) => {
  const now = new Date();
  const posterInfo = {
    icon: poster.icon || "./public/icon1.png",
    name: poster.name || "Anonymous User",
  };
  const post = {
    id: nanoid(),
    date: now.toDateString(),
    body: body,
    likes: [],
    poster: posterInfo,
  };
  return post;
};

async function getPosts() {
  return readJson(postsPath);
}

// Add new post; throw error if ID already taken
async function addPost(post) {
  const postList = await getPosts();
  if (!searchPostId(post.id)) {
    postList.push();
  } else {
    throw new Error(`Error: Post ID ${post.id} already exists`);
  }

  await writeJson(postsPath, postList);
}

async function createPost(body, poster) {
  const post = postFactory(body, poster);
  addPost(post);
}
async function searchPostId(postId) {
  const postList = await getPosts();
  return postList.find((post) => post.id === postId);
}

// The function will automatically catch any errors thrown and call the next function
const getPostById = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const post = await searchPostId("" + postId);

  if (!post) {
    // res.status(404).send("Post not found");
    // return;
    throw new CustomNotFoundError("Post not found");
  }
  res.render("post", { post });
});

module.exports = { getPostById, createPost };
