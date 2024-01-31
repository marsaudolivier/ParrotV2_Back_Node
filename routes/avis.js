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
// Ajouter un nouvel avis
router.post('/', (req, res) => {
  const avis = req.body;
  pool.query('INSERT INTO `Avis` SET ?', avis, (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      avis.id = results.insertId;
      res.json(avis);
    }
  });
});
// Mettre à jour un avis existant
router.put('/:id', (req, res) => {
  const avis = req.body;
  const id = req.params.id;
  pool.query('UPDATE `Avis` SET ? WHERE Id_Avis = ?', [avis, id], (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      avis.id = +id;
      res.json(avis);
    }
  });
});
// Supprimer un avis
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM `Avis` WHERE Id_Avis = ?', id, (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json({ message: `Avis ${id} supprimé` });
    }
  });
});


module.exports = router;
