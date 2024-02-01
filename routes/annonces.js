// routes/complexes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Updated the path

// Récupérer tous les complexes
router.get('/', (req, res) => {
  pool.query('SELECT * FROM `Annonces`', (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});
//recupération des  annonces par id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM `Annonces` WHERE Id_annonces = ? ', id, (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});
//recupération des annonces avec inner join voiture Id_voitures + marques + modeles
router.get('/voiture/:id', (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM `Annonces` INNER JOIN Voitures ON Annonces.Id_voitures = Voitures.Id_voitures INNER JOIN Marques ON Voitures.Id_Marques = Marques.Id_Marques INNER JOIN Modeles ON Voitures.Id_Modeles = Modeles.Id_Modeles WHERE Annonces.Id_voitures = ? ', id, (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});
//recupération des annonces avec inner join voiture  + marques + modeles
router.get('/voitures', (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM `Annonces` INNER JOIN Voitures ON Annonces.Id_voitures = Voitures.Id_voitures', id, (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});
//Effacé annonces par id
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM `Annonces` WHERE Id_annonces = ? ', id, (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json({ message: 'Annonces effacé avec succès!' });
    }
  });
});
//Ajout d'une annonces 
router.post('/', (req, res) => {
  const data = req.body;
  pool.query('INSERT INTO `Annonces` SET ?', data, (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json({ message: 'Annonces ajouté avec succès!' });
    }
  });
});



module.exports = router;
