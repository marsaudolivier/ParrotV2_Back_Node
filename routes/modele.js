// routes/complexes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Updated the path

// Récupérer tous les modele
router.get('/', (req, res) => {
  pool.query('SELECT * FROM `Modeles`', (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
}
);
//récupération des modele par Id_Marques
router.get('/:id', (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM `Modeles` WHERE Id_Marques = ? ', id, (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
}
);




module.exports = router;
