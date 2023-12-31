// routes/complexes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Updated the path

// Récupérer tous les complexes
router.get('/', (req, res) => {
  pool.query('SELECT e.nom AS nom_employer, e.prenom, r.fonction AS role FROM employer e INNER JOIN role r ON e.Id_role = r.Id_role', (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
