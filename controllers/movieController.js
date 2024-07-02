const movieService = require('../services/movieService');
const sessionService = require('../services/sessionService');


exports.create = async (req, res) => {
  try {
    const movie = await movieService.create(req.body);
    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar movie' });
  }
};

exports.findById = async (req, res) => {
  try {
    const movie = await movieService.findById(req.params.id);
    let htmlContent = `
      <div>
        <h1>${movie.title}</h1>
        <img src="${movie.image}" alt="${movie.title}" width="300" height="400"/>
        <a href="/movies">Voltar</a>
        <p>${movie.description}</p>
        <p>${movie.genre}</p>
        <p>${movie.actors.join(', ')}</p>
    `;

    if (movie.sessions.length !== 0) {
      for (const sessionId of movie.sessions) {
        const session = await sessionService.findById(sessionId);
        htmlContent += generateSessionHtml(session, movie._id);
      }
    } else {
      htmlContent += `<hr/><p>Não há sessões disponíveis</p>`;
    }

    htmlContent += '</div>';
    res.send(htmlContent);
  } catch (err) {
    console.error(`Erro ao buscar filme: ${err.message}`, err);
    res.status(500).json({ message: 'Erro ao buscar filme' });
  }
};

function generateSessionHtml(session, movieId) {
  let sessionHtml = `<h2>Sessão</h2>
                      <p>Horário: ${session.time} - Sala: ${session.room}</p>
                      <p>Capacidade: ${session.capability}</p>`;

  session.tickets.forEach(ticket => {
    sessionHtml += ticket.available ? `
      <form action="buy-ticket/${movieId}/${session._id}/${ticket._id}" method="post">
        <button type="submit">Comprar Ingresso ${ticket.seat}</button>
      </form>
    ` : `<p>Ingresso ${ticket.seat} indisponível</p>`;
  });

  return sessionHtml;
};

function generateSessionHtml(session) {
  let sessionHtml = `<h2>Sessão</h2>
                      <p>Horário: ${session.time} - Sala: ${session.room}</p>
                      <p>Capacidade: ${session.capability}</p>`;

  session.tickets.forEach(ticket => {
    sessionHtml += ticket.available ? `
      <form action="buy-ticket/${session._id}/${ticket._id}" method="post">
        <button type="submit">Comprar Ingresso ${ticket.seat}</button>
      </form>
    ` : `<p>Ingresso ${ticket.seat} indisponível</p>`;
  });

  return sessionHtml;
};

exports.findAll = async (req, res) => {
  try {
    const movies = await movieService.findAll();
    res.status(200).send(movies.map(movie => {
      return `
        <div>
          <h1>${movie.title}</h1>
          <img src="${movie.image}" alt="${movie.title}" width="300" height="400"/>
          <p>${movie.description}</p>
          <p>${movie.genre}</p>
          <p>${movie.actors.join(', ')}</p>
          <a href="/movies/${movie._id}">Ver detalhes</a>
          <a href="/">Voltar</a>
          <hr/>
        </div>`
    }).join('')
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar movies' });
  }
};

exports.update = async (req, res) => {
  try {
    const movie = await movieService.update(req.params.id, req.body);
    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar movie' });
  }
};

exports.delete = async (req, res) => {
  try {
    await movieService.delete(req.params.id);
    res.json({ message: 'movie deletado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao deletar movie' });
  }
};

exports.buyTicket = async (req, res) => {
  try {
    const movie = await movieService.buyTicket(req.params.id, req.params.session_id, req.params.ticket_id);
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
