// backend/routes/estimate.js
const express = require('express');
const router = express.Router();
const { estimateCost } = require('../controllers/estimateOpenAI');

router.post('/', estimateCost);
module.exports = router;
