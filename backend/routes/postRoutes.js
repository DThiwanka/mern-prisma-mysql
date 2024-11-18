const express = require('express');
const { getAllPosts, createPost, deletePost, updatePost, softDeletePost } = require('../controllers/postController');
const router = express.Router();

router.get('/', getAllPosts);
router.post('/', createPost);
router.delete('/:id', deletePost);

router.put('/posts/:id', updatePost);
router.delete('/posts/:id', softDeletePost);

module.exports = router;

