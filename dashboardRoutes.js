const express = require('express');
const { deposit, withdraw } = require('../controllers/dashboardController');
const router = express.Router();


router.post('/deposit', deposit);


router.post('/withdraw', withdraw);

module.exports = router;
