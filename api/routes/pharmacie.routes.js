const express = require('express');
const router = express.Router();
const pharmacieHandler = require('../controllers/pharmacie.controller');

/**
 * Set up the pharmacie routes and link them to the corresponding controller functions.
 * @param {express.Application} app - The Express application.
 */
const setupPharmacie = (app) => {
    // Mount the 'router' to handle routes with the base path '/pharmacie'.
    app.use("/pharmacie", router);
    router.get('/list', pharmacieHandler.listPharmacie);
    router.post('/add', pharmacieHandler.createPharmacie);
    router.get('/download', pharmacieHandler.generateAndDownloadCSV);
    router.put('/update', pharmacieHandler.updatePharmacie);
    router.delete('/delete', pharmacieHandler.deletePharmacie);    
  };
  
  module.exports = { setupPharmacie };
