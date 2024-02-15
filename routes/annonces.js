// routes/complexes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Updated the path
const multer = require('multer');

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
//recupération toute les annonce avec filtres km min max anneé min max price min max  avec envoie en formdata
router.post("/filter", (req,res)=>{
  const data = req.body;
  const kmmin = data.kmmin;
  const kmmax = data.kmmax;
  const annemin = data.annemin;
  const annemax = data.annemax;
  const pricemin = data.pricemin;
  const pricemax = data.pricemax;
  pool.query('SELECT * FROM `Annonces` INNER JOIN Voitures ON Annonces.Id_Voitures = Voitures.Id_Voitures INNER JOIN Marques ON Voitures.Id_Marques = Marques.Id_Marques INNER JOIN Modeles ON Voitures.Id_Modeles = Modeles.Id_Modeles WHERE Voitures.kilometrage BETWEEN ? AND ? AND Voitures.Annee BETWEEN ? AND ? AND Voitures.Prix BETWEEN ? AND ?', [kmmin, kmmax, annemin, annemax, pricemin, pricemax], (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});
//Créaction d'une annonces Voiture avec photo et multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    //ajout nom unique
    const ext = Math.random().toString(28) + file.originalname;
    cb(null, `${file.fieldname}-${ext}`);
  }
});
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // limit size to 5MB if needed
}).single('photo_principal');

router.post('/Voitures', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ message: err.message });
    }
    
    // Process other form data
    const formData = req.body;
    const photo_principal = req.file; // Get the uploaded file

    // Construct the object to insert into the database
    const voiture = {
      Id_Marques: formData.Id_Marques,
      Id_Modeles: formData.Id_Modeles,
      Annee: formData.annee,
      Kilometrage: formData.kilometrage,
      Prix: formData.prix,
      photo_principal: photo_principal.filename // Assuming filename is stored in the file object
    };

    // Insert into the database
    pool.query('INSERT INTO `Voitures` SET ?', voiture, (error, results, fields) => {
      if (error) {
        return res.json({ message: error.message });
      }

      const id_voiture = results.insertId;
      const annonce = {
        Id_Voitures: id_voiture,
        date_publication: new Date(),
        titre: formData.titre
      };
      
      // Insert into the Annonces table
      pool.query('INSERT INTO `Annonces` SET ?', annonce, (error, results, fields) => {
        if (error) {
          return res.json({ message: error.message });
        }

        res.json({ message: 'Annonces ajouté avec succès!' });
      });
    });
  });
});

//recupération des  annonces par id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM `Annonces` INNER JOIN Voitures ON Annonces.Id_Voitures = Voitures.Id_Voitures INNER JOIN Marques ON Voitures.Id_Marques = Marques.Id_Marques INNER JOIN Modeles ON Voitures.Id_Modeles = Modeles.Id_Modeles  WHERE Id_Annonces = ? ', id, (error, results, fields) => {
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
  pool.query('SELECT * FROM `Annonces` INNER JOIN Voitures ON Annonces.Id_Voitures = Voitures.Id_Voitures INNER JOIN Marques ON Voitures.Id_Marques = Marques.Id_Marques INNER JOIN Modeles ON Voitures.Id_Modeles = Modeles.Id_Modeles WHERE Annonces.Id_Voitures = ? ', id, (error, results, fields) => {
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




module.exports = router;
