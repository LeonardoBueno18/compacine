const sessionService = require('../services/sessionService');

exports.create = async (req, res) => {
  const session = await sessionService.create(req.body);
  res.json(session);
};

exports.findAll = async (req, res) => {
  const sessions = await sessionService.findAll();
  res.status(200).send(sessions.map(session => {
    return  `
    <div>
      <h1>Sessão<h1>
      <a href="/">Voltar</a>
      <h2>${session.time}</h2>
      <p>Sala :${session.room}</p>
      <h3>Ingressos da sessão</h3>
      <p>${session.tickets[0]}</p>
      <p>${session.tickets[1]}</p>
      <hr/>
    </div>`}).join('')
);
};

exports.findById = async (req, res) => {
  try {
    const session = await sessionService.findById(req.params.id);
    res.json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar session' });
  }
};
