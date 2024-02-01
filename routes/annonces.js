// routes/complexes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Updated the path

// Récupérer tous les annonces voiture + marques + modeles associées
router.get('/', (req, res) => {
  pool.query('SELECT * FROM `Annonces` INNER JOIN Voitures ON Annonces.Id_Voitures = Voitures.Id_Voitures INNER JOIN Marques ON Voitures.Id_Marques = Marques.Id_Marques INNER JOIN Modeles ON Voitures.Id_Modeles = Modeles.Id_Modeles ', (error, results, fields) => {
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
  pool.query('SELECT * FROM `Annonces` WHERE Id_Annonces = ? ', id, (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});
//recupération des annonces avec inner join voiture Id_voitures + marques + modeles + consommation ennergie 
router.get('/voiture/:id', (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM `Annonces` INNER JOIN comsommer ON Annonces.Id_Voitures = comsommer.Id_Voitures INNER JOIN Energies ON comsommer.Id_Energies = Energies.Id_Energies INNER JOIN Voitures ON Annonces.Id_Voitures = Voitures.Id_Voitures INNER JOIN Marques ON Voitures.Id_Marques = Marques.Id_Marques INNER JOIN Modeles ON Voitures.Id_Modeles = Modeles.Id_Modeles WHERE Annonces.Id_Voitures = ? ', id, (error, results, fields) => {
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
