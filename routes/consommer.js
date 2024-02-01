// routes/complexes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Updated the path

// Récupérer tous les consommer
router.get('/', (req, res) => {
  pool.query('SELECT * FROM consommer', (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});
//recupération des consommer par Id_Voitures
router.get('/:id', (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM `consommer`  INNER JOIN Energies ON Energies.Id_Energies = consommer.Id_Energies WHERE Id_Voitures = ? ', id, (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});
module.exports = router;
