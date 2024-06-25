const sessionService = require('../services/sessionService');

exports.create = async (req, res) => {
  const session = await sessionService.create(req.body);
  res.json(session);
};

exports.findAll = async (req, res) => {
  const sessions = await sessionService.findAll();
  res.status(200).send(sessions.map(session => {
    return console.log(session);})
);
};
