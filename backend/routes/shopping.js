const express = require('express');
const pool = require('../lib/db'); // Importiere die Datenbankverbindung
const router = express.Router();

// GET: Alle Items abrufen
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM shopping_items');
    res.status(200).json(result.rows); // Items als JSON zurückgeben
  } catch (err) {
    res.status(500).json({ message: 'Fehler beim Abrufen der Items: ' + err.message });
  }
});

// POST: Neues Item hinzufügen
router.post('/', async (req, res) => {
  const { name, amount } = req.body;

  if (!name || typeof amount !== 'number') {
    return res.status(400).json({ message: 'Invalid data format' });
  }

  try {
    // Zuerst nach dem Item suchen
    const findItemResult = await pool.query(
      'SELECT * FROM shopping_items WHERE name = $1',
      [name]
    );

    // Wenn das Item existiert, den amount aktualisieren (hinzufügen)
    if (findItemResult.rows.length > 0) {
      // Item gefunden, also den amount aktualisieren (addieren)
      const updateResult = await pool.query(
        'UPDATE shopping_items SET amount = amount + $1 WHERE name = $2 RETURNING *',
        [amount, name]
      );
      return res.status(200).json(updateResult.rows[0]);
    } else {
      // Item existiert nicht, also fügen wir es neu hinzu
      const insertResult = await pool.query(
        'INSERT INTO shopping_items (name, amount) VALUES ($1, $2) RETURNING *',
        [name, amount]
      );
      return res.status(201).json(insertResult.rows[0]);
    }

  } catch (err) {
    res.status(500).json({ message: 'Fehler beim Hinzufügen des Items: ' + err.message });
  }
});



// PUT: Item aktualisieren
router.put('/:name', async (req, res) => {
  const { name } = req.params;
  const { amount } = req.body;

  if (!name || typeof amount !== 'number') {
    return res.status(400).json({ message: 'Invalid data format' });
  }

  try {
    const result = await pool.query(
      'UPDATE shopping_items SET amount = $1 WHERE name = $2 RETURNING *',
      [amount, name]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Item nicht gefunden' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Fehler beim Aktualisieren des Items: ' + err.message });
  }
});

// DELETE: Item löschen
router.delete('/:name', async (req, res) => {
  const { name } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM shopping_items WHERE name = $1 RETURNING *',
      [name]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Item nicht gefunden' });
    }
    res.status(204).send(); // Kein Inhalt zurückgeben
  } catch (err) {
    res.status(500).json({ message: 'Fehler beim Löschen des Items: ' + err.message });
  }
});

module.exports = router;
