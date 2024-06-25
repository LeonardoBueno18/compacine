
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.post('/', ticketController.create);
router.get('/', ticketController.findAll);
router.post('/buy', ticketController.buyTicket);

module.exports = router;