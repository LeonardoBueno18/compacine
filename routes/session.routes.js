const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/session.controller');

router.post('/', sessionController.create);
router.get('/', sessionController.findAll);
router.get('/:id', sessionController.findById);
router.put('/:id', sessionController.update);
router.delete('/:id', sessionController.delete);

module.exports = router;