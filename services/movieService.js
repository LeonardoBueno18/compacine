const Movie = require('../models/Movie');
const Session = require('../models/Session');

exports.create = async (data) => {
  const Movie = new movie(data);
  await Movie.save();
  return Movie;
};

exports.findAll = async () => {
  return await Movie.find().populate('sessions');
};

exports.update = async (id, data) => {
  return Movie.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await Movie.findByIdAndDelete(id);
};

exports.findById = async (id) => {
  return await Movie.findById(id).populate('sessions');
};

exports.buyTicket = async (id, session_id, ticket_id) => {
  const movie = await Movie.findById(id).populate('sessions');

  for (const session of movie.sessions) {
    if (session_id === session.id.toString()) {
      for (const ticket of session.tickets) {
        if (ticket._id.toString() === ticket_id && ticket.available) {
          ticket.available = false; // Marca o ticket como não disponível
          ticketPurchased = true;
          purchasedTicketDetails = `Ingresso comprado com sucesso! Assento: ${ticket.seat}, Preço: ${ticket.price}`;
          break; // Sai do loop de tickets uma vez que o ticket foi comprado
        }
      }

      if (ticketPurchased) {
        // Atualiza o campo capability para refletir o número atual de tickets disponíveis
        session.capability = session.tickets.filter(ticket => ticket.available).length;

        await session.save(); // Salva a sessão com o ticket atualizado e o capability atualizado
        return purchasedTicketDetails;
      } else {
        throw new Error('Ingresso indisponível');
      }
    }
  }

  if (!ticketPurchased) {
    throw new Error('Sessão ou ingresso não encontrado');
  }
};