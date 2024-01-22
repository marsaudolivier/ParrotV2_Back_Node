// routes/complexes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Updated the path

// Récupérer tous les Services
router.get('/', (req, res) => {
  pool.query('SELECT * FROM Services', (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});
//recupération des  Services par id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM Services WHERE Services = ? ', id, (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});
//Ajout de service
router.post('/', (req, res) => {
  const data = req.body;
  pool.query('INSERT INTO `Services` SET ?', data, (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json({ message: 'Service ajouté avec succès!' });
    }
  });
});
//supression de service
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM `Services` WHERE Id_Services = ?', id, (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json({ message: 'Service supprimé avec succès!' });
    }
  });
});
//modification de services
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const data = req.body;
  pool.query('UPDATE `Services` SET ? WHERE Id_Services = ?', [data, id], (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json({ message: 'Service modifié avec succès!' });
    }
  });
});


module.exports = router;
