// routes/complexes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Updated the path

// Récupérer tous les film
router.get('/', (req, res) => {
  pool.query('SELECT * FROM `film`', (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});
// Incersion de film avec, Id_film	titre	duree	synopsie	 
router.post('/', (req, res) => {
  const formData = req.body;
  const { titre, synopsie } = formData;


  const query = 'INSERT INTO film (titre, synopsie) VALUES (?,?)';
  const values = [titre, synopsie];

  pool.query(query, values, (error, results, fields) => {
    if (error) {
      console.error("Error inserting into database:", error);
      res.json({ message: error.message });
    } else {
      console.log("Insertion successful:", results);
      res.json(results);
    }
  });
});
//delette par ID
router.delete('/:id', (req, res) => {
  const idFilm = req.params.id;
  const query = 'DELETE FROM film WHERE Id_film = ?';
  const values = [idFilm];

  pool.query(query, values, (error, results, fields) => {
    if (error) {
      console.error("Error deleting from database:", error);
      res.json({ message: error.message });
    } else {
      console.log("Deletion successful:", results);
      res.json(results);
    }
  });
});
//update
router.put('/:id', (req, res) => {
  const idFilm = req.params.id;
  const formData = req.body;
  const { titre, synopsie } = formData;

  const query = 'UPDATE film SET titre = ?, synopsie = ? WHERE Id_film = ?';
  const values = [titre, synopsie, idFilm];

  pool.query(query, values, (error, results, fields) => {
    if (error) {
      console.error("Error updating database:", error);
      res.json({ message: error.message });
    } else {
      console.log("Update successful:", results);
      res.json(results);
    }
  });
});



module.exports = router;
