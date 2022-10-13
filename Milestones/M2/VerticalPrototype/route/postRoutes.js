const express = require('express');
const postControllers = require('../controllers/postControllers');
const router = express.Router();

router.route("/").get(postControllers.getAllPosts).post(postControllers.createNewPost);

router.route(":title").get(postControllers.getPostByTitle);

module.exports = router;