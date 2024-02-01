// routes/complexes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Updated the path

// Récupérer tous les avoir
router.get('/', (req, res) => {
  pool.query('SELECT * FROM `avoir`', (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});
//recupération des avoir par Id_Vehicules
router.get('/:id', (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM `avoir`  INNER JOIN Options ON Options.Id_Options = avoir.Id_Options WHERE Id_Vehicules = ? ', id, (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});



module.exports = router;
