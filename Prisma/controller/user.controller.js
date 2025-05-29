import prisma from "../utils/db.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const existingUser = await prisma.user.findunique({ where: { email }})

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