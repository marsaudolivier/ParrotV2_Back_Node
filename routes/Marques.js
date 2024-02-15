// routes/complexes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Updated the path

// Récupérer tous les marques
router.get('/', (req, res) => {
  pool.query('SELECT * FROM `Marques`', (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
}
);




module.exports = router;
