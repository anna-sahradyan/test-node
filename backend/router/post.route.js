const express = require('express');
const {createPost, allPosts, deletePost, editPost, getPostById,deleteAllPosts,deleteSelectedPosts} = require("../controller/post.controller");
const router = express.Router();
router.post('/', createPost);
router.get('/all', allPosts);
router.get('/:id', getPostById);
router.put('/:id', editPost);
router.delete('/:id', deletePost);
router.delete('/all', deleteAllPosts);

module.exports = router;
