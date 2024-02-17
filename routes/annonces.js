// routes/complexes.js
const express = require("express");
const router = express.Router();
const pool = require("../config/db"); // Updated the path
const multer = require("multer");

// Récupérer tous les annonces voiture + marques + modeles associées
router.get("/", (req, res) => {
  pool.query(
    "SELECT * FROM `Annonces` INNER JOIN Voitures ON Annonces.Id_Voitures = Voitures.Id_Voitures INNER JOIN Marques ON Voitures.Id_Marques = Marques.Id_Marques INNER JOIN Modeles ON Voitures.Id_Modeles = Modeles.Id_Modeles ",
    (error, results, fields) => {
      if (error) {
        res.json({ message: error.message });
      } else {
        res.json(results);
      }
    }
  );
});
//recupération toute les annonce avec filtres km min max anneé min max price min max  avec envoie en formdata
router.post("/filter", (req, res) => {
  const data = req.body;
  const kmmin = data.kmmin;
  const kmmax = data.kmmax;
  const annemin = data.annemin;
  const annemax = data.annemax;
  const pricemin = data.pricemin;
  const pricemax = data.pricemax;
  pool.query(
    "SELECT * FROM `Annonces` INNER JOIN Voitures ON Annonces.Id_Voitures = Voitures.Id_Voitures INNER JOIN Marques ON Voitures.Id_Marques = Marques.Id_Marques INNER JOIN Modeles ON Voitures.Id_Modeles = Modeles.Id_Modeles WHERE Voitures.kilometrage BETWEEN ? AND ? AND Voitures.Annee BETWEEN ? AND ? AND Voitures.Prix BETWEEN ? AND ?",
    [kmmin, kmmax, annemin, annemax, pricemin, pricemax],
    (error, results, fields) => {
      if (error) {
        res.json({ message: error.message });
      } else {
        res.json(results);
      }
    }
  );
});
//Créaction d'une annonces Voiture avec photo et multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    //ajout nom unique
    const ext = Math.random().toString(28) + file.originalname;
    cb(null, `${file.fieldname}-${ext}`);
  },
});
const upload = multer({ storage }).array("photo_principal", 10);
router.post("/Voitures", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ message: err.message });
    }
    const photoAddresses = req.files.map((file) => `${file.filename}`);
    const data = { ...req.body, photo_principal: photoAddresses[0] };

    const voiture = {
      Id_Marques: data.Id_Marques,
      Id_Modeles: data.Id_Modeles,
      Annee: data.annee,
      Kilometrage: data.kilometrage,
      Prix: data.prix,
      photo_principal: data.photo_principal,
    };
    // console.log(voiture);

    pool.query(
      "INSERT INTO `Voitures` SET ?",
      voiture,
      (error, results, fields) => {
        if (error) {
          return res.json({ message: error.message });
        }

        const id_voiture = results.insertId;
        const annonce = {
          Id_Voitures: id_voiture,
          date_publication: new Date(),
          titre: data.titre,
        };

        pool.query(
          "INSERT INTO `Annonces` SET ?",
          annonce,
          (error, results, fields) => {
            if (error) {
              return res.json({ message: error.message });
            }
            //retour de mon Id_Voitures
            const id_annonce = results.insertId;
            const optionss = data.options;
            console.log(typeof optionss);
            const optionValues = Object.values(data.options);
            const optionsArray = optionValues[0]
              .split(",")
              .map((option) => parseInt(option.trim()));

            // Traiter chaque nombre individuellement
            optionsArray.forEach((option) => {
              pool.query(
                "INSERT INTO `avoir` SET ?",
                { Id_Voitures: id_voiture, Id_Options: option },
                (error, results, fields) => {
                  if (error) {
                    return res.json({ message: error.message });
                  }
                  pool.query(
                    "INSERT INTO `consommer` SET ?",
                    { Id_Voitures: id_voiture, Id_Energies: data.energie },
                    (error, results, fields) => {
                      if (error) {
                        return res.json({ message: error.message });
                      }
                    }
                  );
                }
              );
            });
          }
        );
      }
    );
  });
});
//recupération des  annonces par id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  pool.query(
    "SELECT * FROM `Annonces` INNER JOIN Voitures ON Annonces.Id_Voitures = Voitures.Id_Voitures INNER JOIN Marques ON Voitures.Id_Marques = Marques.Id_Marques INNER JOIN Modeles ON Voitures.Id_Modeles = Modeles.Id_Modeles  WHERE Id_Annonces = ? ",
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
//recupération des annonces avec inner join voiture Id_voitures + marques + modeles + consommation ennergie
router.get("/voiture/:id", (req, res) => {
  const id = req.params.id;
  pool.query(
    "SELECT * FROM `Annonces` INNER JOIN Voitures ON Annonces.Id_Voitures = Voitures.Id_Voitures INNER JOIN Marques ON Voitures.Id_Marques = Marques.Id_Marques INNER JOIN Modeles ON Voitures.Id_Modeles = Modeles.Id_Modeles WHERE Annonces.Id_Voitures = ? ",
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

//Effacé annonces par id
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  pool.query(
    "DELETE FROM `Annonces` WHERE Id_annonces = ? ",
    id,
    (error, results, fields) => {
      if (error) {
        res.json({ message: error.message });
      } else {
        //récupéré Id_Voitures et effacé la voiture associer
        pool.query(
          "SELECT Id_Voitures FROM `Annonces` WHERE Id_annonces = ? ",
          id,
          (error, results, fields) => {
            if (error) {
              res.json({ message: error.message });
            } else {
              const id_voiture = results[0].Id_Voitures;
              pool.query(
                "DELETE FROM `Voitures` WHERE Id_Voitures = ? ",
                id_voiture,
                (error, results, fields) => {
                  if (error) {
                    res.json({ message: error.message });
                  } else {
                    res.json({ message: "Annonce effacé avec succès" });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});
    

module.exports = router;
