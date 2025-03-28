const fs = require("fs");
const postsPath = "../data/posts.json";
const threadsPath = "../data/threads.json";

// Load and parse JSON data
async function readJson(path) {
  // https://goenning.net/blog/stop-reading-json-files-with-require/
  //   fs.readFileSync(require.resolve(path), (err, data) => {
  //     if (err) cb(err);
  //     else cb(null, JSON.parse(data));
  //   });
  const content = fs.readFile(path, "utf8", (err, data) => data);
  // Return parsed JSON if valid, else return false
  if (!content) return false;
  try {
    return JSON.parse(content);
  } catch (error) {
    return false;
  }
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
