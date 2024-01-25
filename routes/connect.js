
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); 
const crypto = require('crypto');
const cookieParser = require('cookie-parser');


router.use(cookieParser());
router.post('/', (req, res) => {
  const { mail, mdp } = req.body;
  const bcrypt = require('bcrypt');
  const myPlaintextPassword = mdp;

  pool.query('SELECT * FROM Utilisateurs WHERE mail = ?', [mail], (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      bcrypt.compare(myPlaintextPassword, results[0].mdp, function(err, result) {
        if (result == true) {
          const token = generateToken();
          pool.query('UPDATE Utilisateurs SET token = ? WHERE mail = ?', [token, mail]);
          res.cookie('mail', mail, { maxAge: 900000, httpOnly: true });
          res.cookie('token', token, { maxAge: 900000, httpOnly: true });

          res.json({ message: 'Connexion réussie', token });
        } else {
          res.json({ message: 'Mot de passe incorrect' });
        }
      });
    }
  });
});

function generateToken() {
  // Générer des bytes aléatoires
  const randomBytes = crypto.randomBytes(20);
  // Convertir les bytes en une chaîne hexadécimale
  const token = randomBytes.toString('hex');
  return token;
}

module.exports = router;
