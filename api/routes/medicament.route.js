const express = require('express');
const router = express.Router();
const medicamentHandler = require('../controllers/medicament.controller');

/**
 * Set up the medicament routes and link them to the corresponding controller functions.
 * @param {express.Application} app - The Express application.
 */
const setupMedicament = (app) => {
    // Mount the 'router' to handle routes with the base path '/medicament'.
    app.use("/medicament", router);
    router.get('/list', medicamentHandler.listMedicaments);
    router.post('/add', medicamentHandler.createMedicament);
    router.get('/download', medicamentHandler.generateAndDownloadCSV);
    router.put('/update', medicamentHandler.updateMedicament);
    router.delete('/delete', medicamentHandler.deleteMedicament);    
  };
  
  module.exports = { setupMedicament };
