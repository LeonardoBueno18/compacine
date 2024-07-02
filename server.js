const express = require('express');
const mongoose = require('mongoose');
const movieRoutes = require('./routes/movieRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const Movie = require('./models/Movie');
const Session = require('./models/Session');
const path = require("path");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conexão com o MongoDB estabelecida.");
    console.log(process.env.MONGODB_URI)
    app.use('/movies', movieRoutes);
    app.use('/sessions', sessionRoutes);

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
    // Verifying if there are no movies in the collection
    Movie.countDocuments({}, async (err, count) => {
      if (err) {
        console.error("Error: failed to count documents in Movie collection: ", err);
      } else if (count === 0) {
        try {
          const sessions = [
            { time: "15:00", room: "A", capability: 3, tickets: [{ seat: "A1", available: true, price: 20 }, { seat: "A2", available: true, price: 20 }, { seat: "A3", available: true, price: 20 }] },
            { time: "13:00", room: "B", capability: 3, tickets: [{ seat: "B1", available: true, price: 20 }, { seat: "B2", available: true, price: 20 }, { seat: "B3", available: true, price: 20 }] },
            { time: "19:00", room: "C", capability: 3, tickets: [{ seat: "C1", available: true, price: 20 }, { seat: "C2", available: true, price: 20 }, { seat: "C3", available: true, price: 20 }] }
          ];
          const insertedSessions = await Session.insertMany(sessions);
          console.log("3 sessions generated successfully.");

          const movies = [
            { image: "https://upload.wikimedia.org/wikipedia/pt/e/ee/Transformers-poster.jpg", title: "Transformers", description: "Filme sobre robôs gigantes", actors: ["String", "String"], genre: "String", sessions: [insertedSessions[0]._id] },
            { image: "https://upload.wikimedia.org/wikipedia/pt/e/ee/Transformers_Revenge_of_the_Fallen.jpg", title: "Transformers 2", description: "Filme sobre robôs gigantes", actors: ["String", "String"], genre: "String", sessions: [insertedSessions[2]._id] },
            { image: "https://upload.wikimedia.org/wikipedia/pt/b/bf/Transformers_dark_of_the_moon_ver5.jpg", title: "Transformers 3", description: "Filme sobre robôs gigantes", actors: ["String", "String"], genre: "String", sessions: [insertedSessions[1]._id] },
          ];
          await Movie.insertMany(movies);
          console.log("3 movies generated successfully.");
        } catch (insertError) {
          console.error("Error: failed to insert sessions or movies: ", insertError);
        }
      }
    });
  })
  .catch(err => {
    console.error("Error: fail to connect MongoDB: ", err);
  });