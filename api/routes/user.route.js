const express = require('express');
const router = express.Router();
const userHandler = require('../controllers/user.controller');

/**
 * Set up the user routes and link them to the corresponding controller functions.
 * @param {express.Application} app - The Express application.
 */
const setupUser = (app) => {
    // Mount the 'router' to handle routes with the base path '/user'.
    app.use("/user", router);
    router.post('/login', userHandler.loginUser);
    router.get('/list', userHandler.listUsers);
    router.post('/add', userHandler.createUser);
    // router.get('/download', userHandler.generateAndDownloadCSV);
    router.put('/update', userHandler.updateUser);
    router.delete('/delete', userHandler.deleteUser);    
  };
  
  module.exports = { setupUser };
