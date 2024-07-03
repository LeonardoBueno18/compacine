const Movie = require('../models/movie.model');

exports.create = async (data) => {
  const movie = new Movie(data);
  await movie.save();
  return movie;
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
          ticket.available = false;
          ticketPurchased = true;
          purchasedTicketDetails = `Ingresso comprado com sucesso! Assento: ${ticket.seat}, Preço: ${ticket.price}`;
          break;
        }
      }

      if (ticketPurchased) {
        session.capability = session.tickets.filter(ticket => ticket.available).length;
        await session.save();
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