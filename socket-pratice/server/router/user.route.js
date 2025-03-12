const express = require('express');
const router = express.Router();
const User = require('../models/user.models')

router.get('/online', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users.map(user => ({
            id: user._id,
            username: user.username
        })));
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

module.exports = router;