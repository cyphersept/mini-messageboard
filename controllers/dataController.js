const fs = require("fs");
const postsPath = "../data/posts.json";
const threadsPath = "../data/threads.json";

// Load and parse JSON data
async function readJson(path, cb) {
  // https://goenning.net/blog/stop-reading-json-files-with-require/
  //   fs.readFileSync(require.resolve(path), (err, data) => {
  //     if (err) cb(err);
  //     else cb(null, JSON.parse(data));
  //   });
  return JSON.parse(fs.readFile(path));
}

// Asynchronous: jsonify and save content to json file
async function writeJson(path, content) {
  fs.writeFile(path, JSON.stringify(content), "utf-8");
}

async function getPosts() {
  return readJson(postsPath);
}

async function addPost(post) {
  const postList = await getPosts();

  try {
    if (!getPostById(post.id)) {
      postList.push();
    } else {
      throw new Error(`Post ID ${post.id} already exists`);
    }
  } catch (error) {
    next(error);
  }

  writeJson(postsPath, postList);
}

async function getThreads() {
  return readJson(threadsPath);
}

module.exports = { readJson, writeJson };
