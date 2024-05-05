// Import the 'express' module to create an instance of the router.
const express = require('express');
const router = express.Router();
const {setupMedicament} = require('./medicament.route')
const {setupPharmacie} = require('./pharmacie.routes')
/* GET home page. */
// Define a route for the home page ('/') that renders the 'index' template with the title 'Bibemella'.
router.get('/', function(req, res, next) {
  res.json({ title: 'api pharmacie' });
});

/**
 * Function to set up all the app routes and connect them to their corresponding route modules.
 * @returns {express.Router} - The configured router instance.
 */
const setupAppRoutes = () => {
  const app = router;
  setupMedicament(app);
  setupPharmacie(app);
  return app;
}

module.exports = setupAppRoutes;
