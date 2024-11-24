// lib/db.js
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://hse24:password@shoppingdb:5432/shoppingdb',
});

module.exports = pool;
