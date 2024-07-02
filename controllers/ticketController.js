const ticketService = require('../services/ticketService');

exports.create = async (req, res) => {
  const ticket = await ticketService.create(req.body);
  res.json(ticket);
};

exports.findAll = async (req, res) => {
  const tickets = await ticketService.findAll();
  res.json(tickets);
};

exports.comprarIngresso = async (req, res) => {
  try {
    const ticket = await ticketService.buyTicket(req.body);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};