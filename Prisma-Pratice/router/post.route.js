import express from 'express';
import { createPost, deletePost, fetchPosts, updatePost } from '../controller/post.controller.js';
import { createComment, fetchComments } from '../controller/comment.controller.js';

const router = express.Router();


router.route("/fetch-posts").get(fetchPosts)


router.route("/create-post").post(createPost)

router.route("/update-post/:id").put(updatePost)


router.route("/delete-post/:id").delete(deletePost)


router.route("/create-comment").post(createComment)

router.route("/fetch-comments").get(fetchComments)

export default router;