const { nanoid } = require("nano-id");
const { readJson, writeJson } = require("./dataController");
const asyncHandler = require("express-async-handler");
const CustomNotFoundError = require("../errors/CustomNotFoundError");
const threadsPath = "../data/threads.json";

const threadFactory = (title, body, poster) => {
  const now = new Date();
  const posterInfo = {
    icon: poster.icon,
    name: poster.name,
  };
  const thread = {
    title: title,
    id: nanoid(14),
    date: now.toDateString(),
    body: body,
    likes: [],
    poster: posterInfo,
  };
  return thread;
};

// Read up to date list of threads from JSON
async function getThreads() {
  return readJson(threadsPath) || [];
}

// TO-DO: test if will loop until valid ID is generated
async function createThread(title, body, poster) {
  const thread = threadFactory(title, body, poster);

  addThread(thread).catch((err) => createThread(title, body, poster));
}

// Retrieve thread object from matching ID
async function searchThreadId(threadId) {
  const threadList = await getThreads();
  return threadList.find((thread) => thread.id === threadId);
}

// The function will automatically catch any errors thrown and call the next function
const getThreadById = asyncHandler(async (req, res) => {
  const { threadId } = req.params;
  const thread = await searchThreadId("" + threadId);

  if (!thread) {
    // res.status(404).send("Thread not found");
    // return;
    throw new CustomNotFoundError("Thread not found");
  }
  res.render("thread", { thread });
});

// Add new thread; throw error if ID already taken
async function addThread(thread) {
  const threadList = await getThreads();
  if (!searchThreadId(thread.id)) {
    threadList.push();
  } else {
    throw new Error(`Error: Thread ID ${thread.id} already exists`);
  }

  await writeJson(threadsPath, threadList);
}

module.exports = { getThreadById, createThread };
