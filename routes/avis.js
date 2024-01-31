// routes/complexes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Updated the path

// Récupérer tous les avis
router.get('/', (req, res) => {
  pool.query('SELECT * FROM `Avis`', (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});
//affiche uniquement les deux dernier
router.get('/last', (req, res) => {
  pool.query('SELECT * FROM `Avis` ORDER BY Id_Avis DESC LIMIT 2', (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
}
);


module.exports = router;
