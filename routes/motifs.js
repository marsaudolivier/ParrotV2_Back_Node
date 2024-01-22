// routes/complexes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Updated the path

// Récupérer tous les Motifs
router.get('/', (req, res) => {
  pool.query('SELECT * FROM Motifs', (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});
//recupération des  Motifs par id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM Motifs WHERE Id_Motifs = ? ', id, (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});
// Ajouter un nouveau Motif
router.post('/', (req, res) => {
  const data = req.body;
  pool.query('INSERT INTO `Motifs` SET ?', data, (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json({ message: 'Motif ajouté avec succès!' });
    }
  });
});
// Modifier un Motif
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const data = req.body;
  pool.query('UPDATE `Motifs` SET ? WHERE `Id_Motifs` = ?', [data, id], (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json({ message: 'Motif modifié avec succès!' });
    }
  });
});
// Supprimer un Motif
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM `Motifs` WHERE `Id_Motifs` = ?', id, (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json({ message: 'Motif supprimé avec succès!' });
    }
  });
});

module.exports = router;
