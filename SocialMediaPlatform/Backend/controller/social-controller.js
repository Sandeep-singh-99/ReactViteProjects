const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

const Post = require("../models/post-model")

// Get all Posts
const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (error) {
        res.status(500).json({error: "Internal Server error"})
    }
}

// Create a new post
const createPost = async(req, res) => {
    try {
        const {title, content} = req.body
        const file = req.file ? req.file.filename : undefined

        if (!title || !content) {
            return res.status(400).json({error: 'Title and content are required fields'})
        }

        const post = new Post({title, content, file})
        await post.save()
        res.status(201).json(post)
    } catch (error) {
        console.error('Error creating post: ', error);
        res.status(500).json({error: "Internal server error"})
    }
}

//Like a post
const likePost = async (req, res) => {
    try {
        const postId = req.params.postId
        const post = await Post.findById(postId)

        if (!post) {
            return res.status(400).json({error: "Post not found"})
        }

        post.like += 1
        await post.save()

        res.json(post)
    } catch (error) {
        console.error('Error liking post: ', error);
        res.status(500).json({error: "Internal server error"})
    }
}

// comment on a post

const commentPost = async (req, res) => {
    try {
        const postId = req.params.postId
        const {text} = req.body
        const post = await Post.findById(postId)

        if(!post) {
            return res.status(404).json({error: "Post not found"})
        }

        post.comments.push({text})
        await post.save()

        res.json(post)
    } catch (error) {
        console.error('Error adding comment: ', error);
        res.status(500).json({error: "Internal server error"})
    }
}

module.exports = {getAllPost, createPost, likePost, commentPost, upload}