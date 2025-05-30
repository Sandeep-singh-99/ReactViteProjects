import prisma from "../utils/db.js";

export const fetchPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({})

        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const createPost = async (req, res) => {
    try {
        const { title, description, userId } = req.body;

        const newPost = await prisma.post.create({
            data:  {
                title,
                description,
                userId: Number(userId)
            }
        })

        return res.status(201).json(newPost);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description } = req.body;
        const updatedPost = await prisma.post.update({
            where: { id: Number(id) },
            data: { title, description }
        })

        return res.status(200).json(updatedPost);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.post.delete({
            where: { id: Number(id) }
        })

        return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}