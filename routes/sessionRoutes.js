const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

router.post('/', sessionController.create);
router.get('/', sessionController.findAll);
router.get('/:id', sessionController.findById);

module.exports = router;