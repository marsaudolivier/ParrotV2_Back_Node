// routes/complexes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Updated the path

// Récupérer tous les complexes
router.get('/', (req, res) => {
  pool.query('SELECT * FROM Formulaires', (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});
//recupération des  formulaires par id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM Formulaires WHERE Id_formulaires = ? ', id, (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});
//modification formulaire
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const data = req.body;
  pool.query('UPDATE `Formulaires` SET ? WHERE `Id_formulaires` = ?', [data, id], (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json({ message: 'Formulaire modifié avec succès!' });
    }
  });
});
// Supprimer un formulaire
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM `Formulaires` WHERE `Id_formulaires` = ?', id, (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json({ message: 'Formulaire supprimé avec succès!' });
    }
  });
});
// Ajouter un nouveau formulaire
router.post('/', (req, res) => {
  const data = req.body;
  pool.query('INSERT INTO `Formulaires` SET ?', data, (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json({ message: 'Formulaire ajouté avec succès!' });
    }
  });
});


module.exports = router;
