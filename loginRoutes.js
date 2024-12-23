
const express = require('express');
const { login } = require('../controllers/loginController');  // Path to your login controller
const router = express.Router();


router.post('/', login);

module.exports = router;
