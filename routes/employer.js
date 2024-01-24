
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); 

// Récupérer tous les utilisateur
router.get('/', (req, res) => {
  pool.query('SELECT * FROM Utilisateurs', (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});
//recupération des  utilisateur par id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM Utilisateurs WHERE Id_Utilisateurs = ? ', id, (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});
//modification utilisateur
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const data = req.body;
  pool.query('UPDATE `Utilisateurs` SET ? WHERE `Id_Utilisateurs` = ?', [data, id], (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json({ message: 'Utilisateur modifié avec succès!' });
    }
  });
});
// Supprimer un utilisateur
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM `Utilisateurs` WHERE `Id_Utilisateurs` = ?', id, (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json({ message: 'Utilisateur supprimé avec succès!' });
    }
  });
});
// Ajouter un nouveau utilisateur 
router.post('/', (req, res) => {
  const data = req.body;
  pool.query('INSERT INTO `Utilisateurs` SET ?', data, (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json({ message: 'Utilisateur ajouté avec succès!' });
    }
  });
});

module.exports = router;
