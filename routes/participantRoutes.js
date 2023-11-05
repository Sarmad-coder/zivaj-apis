const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participantController');

router.post('/generate-token', participantController.generateToken);

module.exports = router;
