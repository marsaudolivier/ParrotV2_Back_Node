
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
//test si utilisateur a le droit de se connecter
router.post('/login', (req, res) => {
  const data = req.body;
  pool.query('SELECT * FROM `Utilisateurs` WHERE `mail` = ?', data.mail, (error, results, fields) => {
    if (results.length > 0) {
      const bcrypt = require('bcrypt');
      const hash = results[0].mdp;
      const myPlaintextPassword = data.mdp;
      const isMatch = bcrypt.compareSync(myPlaintextPassword, hash);
      if (isMatch) {
        res.json({ message: 'Utilisateur connecté avec succès!' });
      } else {
        res.json({ message: 'Mot de passe incorrect!' });
      }
    } else {
      res.json({ message: 'Utilisateur non trouvé!' });
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
  // Vérifier si les champs sont vides
  if (!data.nom|| !data.prenom || !data.mail || !data.mdp || !data.Id_Roles) {
    res.json({ message: 'Veuillez remplir tous les champs' });
  }
  //Hash de a variable data.mdp etquivalent a $mdp = password_hash($mdp, PASSWORD_DEFAULT); sur php
  const bcrypt = require('bcrypt');
  const saltRounds = 10;
  const myPlaintextPassword = data.mdp;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(myPlaintextPassword, salt);
  data.mdp = hash;
  // Vérifier si l'utilisateur existe déjà
  pool.query('SELECT * FROM `Utilisateurs` WHERE `mail` = ?', data.mail, (error, results, fields) => {
    if (results.length > 0) {
      res.json({ message: 'Utilisateur existe déjà!' });
    } else {
      // Insertion des données
      pool.query('INSERT INTO `Utilisateurs` SET ?', data, (error, results, fields) => {
        if (error) {
          res.json({ message: error.message });
        } else {
          res.json({ message: 'Utilisateur ajouté avec succès!' });
        }
      });
    }
  });
});



module.exports = router;
