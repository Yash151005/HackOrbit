const express = require('express');
const { detectDamage } = require('../controllers/detectController');

const router = express.Router();

// POST /api/detect
router.post('/', detectDamage);

module.exports = router;
