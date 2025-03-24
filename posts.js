const { nanoid } = require("nanoid");

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

async function createPost(body, poster) {
  const post = postFactory(body, poster);
}
async function getPostById(postId) {
  return posts.find((post) => post.id === postId);
}

module.exports = { getPostById };
