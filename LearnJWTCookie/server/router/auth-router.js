const express = require('express');
const router = express.Router();
const authController = require('../controller/auth-controller');
const  authMiddleware  = require('../middleware/jwt-verification');


router.route('/register').post(authController.register);
router.route('/login').post(authController.login);
router.route('/logout').get(authMiddleware, authController.logout);

module.exports = router