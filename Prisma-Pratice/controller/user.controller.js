import prisma from "../utils/db.js";

//    include: {
//                 post: {
//                     select: {
//                         title: true,
//                         description: true,
//                         CommentCount: true
//                     }
//                 }
//             }

export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                _count: {
                    select: {
                        post: true,
                        comment: true
                    }
                }
            }
        })

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const existingUser = await prisma.user.findUnique({ where: { email }})

        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const newUser = await prisma.user.create({ data: {
            name, email, password
        }})


        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// update the user

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        await prisma.user.update({
            where: { id: Number(id) },
            data: { name, email, password }
        })

        return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


export const showUser = async (req, res) => {
    try {
        const { id } = req.params

        const user = await prisma.user.findFirst({
            where: { id: Number(id) }
        })

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        const user = await prisma.user.delete({
            where: { id: Number(id) }
        })

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}