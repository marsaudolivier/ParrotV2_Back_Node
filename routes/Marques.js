const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Updated the path

// Récupérer tous les marque
router.get('/', (req, res) => {
  pool.query('SELECT * FROM `Marques`', (error, results, fields) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(results);
    }
  });
}
);

// Ajouter une marque
router.post('/add', (req, res) => {
    const marque = req.body;
    pool.query('INSERT INTO `Marques` SET ?', marque, (error, results, fields) => {
        if (error) {
        res.json({ message: error.message });
        } else {
        res.json({ message: 'Marque ajoutée avec succès' });
        }
    });
    }
);
// Supprimer une marque
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    pool.query('DELETE FROM `Marques` WHERE Id_Marques = ? ', id, (error, results, fields) => {
        if (error) {
        res.json({ message: error.message });
        } else {
        res.json({ message: 'Marque effacée avec succès' });
        }
    });
    }
);
//recupération des marques par id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM `Marques` WHERE Id_Marques = ? ', id, (error, results, fields) => {
        if (error) {
        res.json({ message: error.message });
        } else {
        res.json(results);
        }
    });
    }
);
//update marques
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const marque = req.body;
    pool.query('UPDATE Marques SET ? WHERE Id_Marques = ?', [marque, id], (error, results, fields) => {
        if (error) {
        res.json({ message: error.message });
        } else {
        res.json({ message: `Marque modifiée avec l'id ${id}` });
        }
    });
    }
);

module.exports = router;

