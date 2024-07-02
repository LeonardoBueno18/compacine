const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.post('/', movieController.create);
router.get('/', movieController.findAll);
router.get('/:id', movieController.findById);
router.post('/buy-ticket/:id/:session_id/:ticket_id', movieController.buyTicket);
router.put('/:id', movieController.update);
router.delete('/:id', movieController.delete);

module.exports = router;
