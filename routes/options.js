// routes/complexes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Updated the path

// Récupérer tous les Options
router.get('/', (req, res) => {
  pool.query('SELECT * FROM Options', (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});
//recupération des  Options par id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM Options WHERE Id_Options = ? ', id, (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});
// Ajouter un nouveau Option
router.post('/', (req, res) => {
  const data = req.body;
  pool.query('INSERT INTO `Options` SET ?', data, (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json({ message: 'Option ajouté avec succès!' });
    }
  });
});
// Modifier un Option
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const data = req.body;
  pool.query('UPDATE `Options` SET ? WHERE `Id_Options` = ?', [data, id], (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json({ message: 'Option modifié avec succès!' });
    }
  });
});
// Supprimer un Option
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM `Options` WHERE `Id_Options` = ?', id, (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json({ message: 'Option supprimé avec succès!' });
    }
  });
});

module.exports = router;
