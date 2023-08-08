const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check_auth');
const usersController = require('../controllers/usersController');


router.post('/signup', usersController.user_signup);
router.post('/login', usersController.user_login);
router.delete('/:userId', checkAuth, usersController.user_delete);

module.exports = router;