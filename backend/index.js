const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware für JSON-Parsing
app.use(express.json());

// In-memory-Datenstruktur für Shopping-Items
let shoppingItems = [];

// Schema für Shopping-Item
class ShoppingItem {
  constructor(name, amount) {
    this.name = name;
    this.amount = amount;
  }
}

// Route: GET /api/shopping
// Beschreibung: Alle Shopping-Items abrufen
app.get('/api/shopping', (req, res) => {
  res.status(200).json(shoppingItems);
});

// Route: GET /api/shopping/:name
// Beschreibung: Einzelnes Shopping-Item abrufen
app.get('/api/shopping/:name', (req, res) => {
  const { name } = req.params;
  const item = shoppingItems.find((item) => item.name === name);
  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// Route: POST /api/shopping
// Beschreibung: Neues Shopping-Item hinzufügen
app.post('/api/shopping', (req, res) => {
  const { name, amount } = req.body;
  if (!name || typeof amount !== 'number') {
    return res.status(400).json({ message: "Invalid data format" });
  }
  const newItem = new ShoppingItem(name, amount);
  shoppingItems.push(newItem);
  res.status(201).json(newItem);
});

// Route: PUT /api/shopping/:name
// Beschreibung: Existierendes Shopping-Item aktualisieren
app.put('/api/shopping/:name', (req, res) => {
  const { name } = req.params;
  const { amount } = req.body;

  const item = shoppingItems.find((item) => item.name === name);
  if (item) {
    item.amount = amount;
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// Route: DELETE /api/shopping/:name
// Beschreibung: Shopping-Item löschen
app.delete('/api/shopping/:name', (req, res) => {
  const { name } = req.params;
  const itemIndex = shoppingItems.findIndex((item) => item.name === name);

  if (itemIndex !== -1) {
    shoppingItems.splice(itemIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// Zusätzliche Routen für /hello und /hello/:name
app.get('/hello', (req, res) => {
  res.status(200).send("Hello!");
});

app.get('/hello/:name', (req, res) => {
  const { name } = req.params;
  res.status(200).send(`Hello, ${name}!`);
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
