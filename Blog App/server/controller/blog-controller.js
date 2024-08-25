const Blog = require("../models/blog-model")

const addBlog = async (req, res) => {
    try {
        const {title, content, image} = req.body

        const blog = await Blog.create({title, content, image, author: req.user.id})

        res.status(200).json({
            message: "Blog created successfully",
            success: true,
            data: blog
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

const getAllBlog = async (req, res) => {
    try {
        const posts = await Blog.find()

        res.status(200).json({
            message: "Blog fetched successfully",
            success: true,
            data: posts
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

const getBlog = async (req, res) => {
    try {
        const blog = await Blog.find().populate('author', ['name'])

        res.status(200).json({
            message: "Blog fetch",
            success: true,
            data: blog,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

const updateBlog = async (req, res) => {
    try {
        const {title, content} = req.body;

        let post = await Blog.findById(req.params.id);

        if(!post) {
            return res.status(404).json({
                message: "Post not found",
                success: false
            })
        }

        if (post.author.toString() !== req.user.id) {
            return res.status(401).json({
                message: "Not Authorized",
                success: false
            })
        }

        post = await Blog.findByIdAndUpdate(req.params.id, {$set: {title, content}}, {new: true})

        res.status(200).json({
            message: "Post updated successfully",
            success: true,
            data: post
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

const deleteBlog = async (req, res) => {
    try {
        const post = await Blog.findById(req.params.id);

        if (!post) {
            return res.status(404).json({message: "Post not found"})
        }

        if (post.author.toString() !== req.user.id) {
            return res.status(401).json({
                message: "Not Authorized",
                success: false
            })
        }

        await Blog.findByIdAndRemove(req.params.id)

        res.status(200).json({
            message: "Post deleted successfully",
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

module.exports = {
    addBlog,
    getBlog,
    updateBlog,
    deleteBlog,
    getAllBlog
}