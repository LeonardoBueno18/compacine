const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

router.post('/', sessionController.create);
router.get('/', sessionController.findAll);

module.exports = router;