const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const shoppingRoutes = require('./routes/shopping'); // Importiere die Shopping-Routen

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routen registrieren
app.use('/api/shopping', shoppingRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Express.js Backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
