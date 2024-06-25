const movieService = require('../services/movieService');

exports.create = async (req, res) => {
  try {
    const movie = await movieService.create(req.body);
    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar movie' });
  }
};

exports.findAll = async (req, res) => {
  try {
    const movies = await movieService.findAll();
    res.status(200).send(movies.map(movie => {
        return `
        <div>
          <h2>${movie.nome}</h2>
          <img src="${movie.imagem}" alt="${movie.nome}" width="300" height="400"/>
          <p>${movie.descricao}</p>
          <p>${movie.genero}</p>
          <p>${movie.atores.join(', ')}</p>
        </div>`
      }).join('')
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar movies'});
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