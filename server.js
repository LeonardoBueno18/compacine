const express = require('express');
const mongoose = require('mongoose');
const movieRoutes = require('./routes/movieRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
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
    app.use('/tickets', ticketRoutes);

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error("Error: fail to connect MongoDB: ", err);
  });