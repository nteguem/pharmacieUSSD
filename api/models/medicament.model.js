const mongoose = require('mongoose');
const Pharmacie = require('./pharmacie.model');

const medicamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String,required: true },
  pharmacies: [{ type: mongoose.Schema.Types.ObjectId, ref: Pharmacie, required: true }],
});

const Medicament = mongoose.model('Medicament', medicamentSchema);

module.exports = Medicament;
