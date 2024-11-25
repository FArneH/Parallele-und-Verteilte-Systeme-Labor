const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://hse24:password@shoppingdb:5432/shoppingdb',
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS shopping_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amount INTEGER NOT NULL
  );
`;

const initDatabase = async () => {
  try {
    console.log('Checking and initializing the database...');
    // Ausführen der SQL-Abfrage zur Erstellung der Tabelle
    await pool.query(createTableQuery);
    console.log('Database initialized successfully.');
  } catch (error) {
    console.error('Error initializing the database:', error);
  }
};

initDatabase();

module.exports = pool;
