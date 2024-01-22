// routes/complexes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Updated the path

// Récupérer tous les horaires
router.get('/', (req, res) => {
  pool.query('SELECT * FROM Photos', (error, results, fields) => {
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
  pool.query('SELECT * FROM Photos WHERE Id_Photos = ? ', id, (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});
//insert photo
router.post('/', (req, res) => {
  const data = req.body;
  pool.query('INSERT INTO `Photos` SET ?', data, (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json({ message: 'Photo ajouté avec succès!' });
    }
  });
});


module.exports = router;
