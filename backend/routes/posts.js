const express = require("express");

const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file.js");

const PostController = require("../controllers/posts");



// Called from app.js with "/api/posts" param.


// routes are relative to "/api/posts" now.
// router.post("", (req, res, next) => {
// router.post(
//   "",
//   checkAuth,
//   multer({storage: storage}).single("image"), PostController.createPost)
router.post(
  "",
  checkAuth,
  extractFile,
  PostController.createPost)

router.put(
  "/:id",
  checkAuth,
  extractFile,
  PostController.updatePost)

router.get('', PostController.getAllPosts);

router.get('/:id', PostController.getPost)

router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;
