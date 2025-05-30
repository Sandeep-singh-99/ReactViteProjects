import prisma from "../utils/db.js";

export const createComment = async (req, res) => {
    try {
        const { postId, userId, content} = req.body;

        const newComment = await prisma.comment.create({
            data: {
                postId: Number(postId),
                userId: Number(userId),
                content
            }
        });

        return res.status(201).json(newComment);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const fetchComments = async (req, res) => {
    try {
        const comments = await prisma.comment.findMany({
            include: {
                user: true,
                post: true
            }
        });

        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}