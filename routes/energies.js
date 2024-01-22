
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Updated the path

// Récupérer tous les energie
router.get('/', (req, res) => {
  pool.query('SELECT * FROM Energies', (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
