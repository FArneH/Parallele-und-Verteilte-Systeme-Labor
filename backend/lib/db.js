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
    await waitForDatabase(); // Verfügbarkeit sicherstellen
    await pool.query(createTableQuery); // Tabelle erstellen
    console.log('Database initialized successfully.');
  } catch (error) {
    console.error('Error initializing the database:', error);
  }
};

const waitForDatabase = async (maxRetries = 5, delayMs = 2000) => {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      await pool.query('SELECT 1'); // Testabfrage
      console.log('Database connection established.');
      return;
    } catch (err) {
      retries++;
      console.log(`Database not ready, retrying... (${retries}/${maxRetries})`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  throw new Error('Database connection could not be established after multiple retries.');
};



initDatabase();

module.exports = pool;
