// routes/complexes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Updated the path

// Récupérer tous les horaires
router.get('/', (req, res) => {
  pool.query('SELECT * FROM Jours', (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});
//recupération des  Jours par id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM Jours WHERE Id_Jours = ? ', id, (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});
//update jours
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const jours = req.body;
  pool.query('UPDATE Jours SET ? WHERE Id_Jours = ?', [jours, id], (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json({ message: `jours modifié avec l'id ${id}` });
    }
  });
});

module.exports = router;
