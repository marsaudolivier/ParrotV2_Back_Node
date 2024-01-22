
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); 

// Récupérer tous les utilisateur
router.get('/', (req, res) => {
  pool.query('SELECT * FROM Utilisateurs', (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
