const express = require('express')
const router = express.Router()
const postController = require('../controller/social-controller')

router.route('/').get(postController.getAllPost)

router.route('/').post(postController.upload.single('file'), postController.createPost)

router.route('/like/:postId').post(postController.likePost)

router.route('/comment/:postId').post(postController.commentPost)


module.exports = router