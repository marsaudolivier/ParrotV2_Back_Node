const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateToken(mail, Id_Roles) {
  const payload = {
    mail: mail,
    Id_Roles: Id_Roles
  };

  // Générer le token avec une clé secrète (vous devez utiliser une clé secrète forte en production)
  const token = jwt.sign(payload, 'Marsaudoliviertest', { expiresIn: '1h' }); // expiresIn définit la durée de validité du token

  return token;
}

// Récupérer tous les utilisateur
router.get("/", (req, res) => {
  pool.query("SELECT * FROM Utilisateurs", (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});
//recupération des  utilisateur par id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  pool.query(
    "SELECT * FROM Utilisateurs WHERE Id_Utilisateurs = ? ",
    id,
    (error, results, fields) => {
      if (error) {
        res.json({ message: error.message });
      } else {
        res.json(results);
      }
    }
  );
});
//test si utilisateur a le droit de se connecter et retourne mail et Tokken généré
router.post("/login", (req, res) => {
  const { mail, mdp } = req.body;

  pool.query(
    "SELECT * FROM `Utilisateurs` WHERE `mail` = ?",
    mail,
    (error, results, fields) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Utilisateur non trouvé!" });
      }

      const user = results[0];
      bcrypt.compare(mdp, user.mdp, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        if (!isMatch) {
          return res.status(401).json({ message: "Mot de passe incorrect!" });
        }

        const token = generateToken(user.mail, user.Id_Roles);
        //ajout du token en bdd avant envoie cookie
        pool.query(
          "UPDATE `Utilisateurs` SET `token` = ? WHERE `mail` = ?",
          [token, mail],
          (error2, result) => {
            if (error2) throw error2;
          }
        );
        res.cookie("token", token, { httpOnly: true });
        res.cookie("mail", user.mail, { httpOnly: true });
        res.cookie("role", user.Id_Roles, { httpOnly: true });
        res.json({ mail: user.mail, token: token, Id_Roles: user.Id_Roles });
      });
    }
  );
});
          



//modification utilisateur
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const bcrypt = require("bcrypt");
  const saltRounds = 10;
  const myPlaintextPassword = data.mdp;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(myPlaintextPassword, salt);
  data.mdp = hash;
  pool.query(
    "UPDATE `Utilisateurs` SET ? WHERE `Id_Utilisateurs` = ?",
    [data, id],
    (error, results, fields) => {
      if (error) {
        res.json({ message: error.message });
      } else {
        res.json({ message: "Utilisateur modifié avec succès!" });
      }
    }
  );
});
// Supprimer un utilisateur
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  pool.query(
    "DELETE FROM `Utilisateurs` WHERE `Id_Utilisateurs` = ?",
    id,
    (error, results, fields) => {
      if (error) {
        res.json({ message: error.message });
      } else {
        res.json({ message: "Utilisateur supprimé avec succès!" });
      }
    }
  );
});
// Ajouter un nouveau utilisateur
router.post("/", (req, res) => {
  const data = req.body;
  // Vérifier si les champs sont vides
  if (!data.nom || !data.prenom || !data.mail || !data.mdp || !data.Id_Roles) {
    res.json({ message: "Veuillez remplir tous les champs" });
  }
  //Hash de a variable data.mdp etquivalent a $mdp = password_hash($mdp, PASSWORD_DEFAULT); sur php
  const bcrypt = require("bcrypt");
  const saltRounds = 10;
  const myPlaintextPassword = data.mdp;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(myPlaintextPassword, salt);
  data.mdp = hash;
  // Vérifier si l'utilisateur existe déjà
  pool.query(
    "SELECT * FROM `Utilisateurs` WHERE `mail` = ?",
    data.mail,
    (error, results, fields) => {
      if (results.length > 0) {
        res.json({ message: "Utilisateur existe déjà!" });
      } else {
        // Insertion des données
        pool.query(
          "INSERT INTO `Utilisateurs` SET ?",
          data,
          (error, results, fields) => {
            if (error) {
              res.json({ message: error.message });
            } else {
              res.json({ message: "Utilisateur ajouté avec succès!" });
            }
          }
        );
      }
    }
  );
});

module.exports = router;
