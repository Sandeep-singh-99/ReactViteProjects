const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/role.middleware');

const router = express.Router();


router.get('/admin', authMiddleware, authorizeRoles("admin"), (req, res) => {
    res.status(200).json({ message: "Admin route" });
})


router.get('/user', authMiddleware, authorizeRoles("user"), (req, res) => {
    res.status(200).json({ message: "User route" });
})

router.get('/manager', authMiddleware, authorizeRoles("manager"), (req, res) => {
    res.status(200).json({ message: "Manager route" });
})

module.exports = router;