const mongoose = require('mongoose');

const pharmacieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String,required: true },
  email: { type: String,required: true },
  phone: { type: String,required: true },
  OpenHour: { type: String,required: true },
  CloseHour: { type: String,required: true },
  adress: { type: String,required: true },
  isEmergencyPharmacy: { type: Boolean, required: true },
  locality: { type: String,required: true },
});

const Pharmacie = mongoose.model('Pharmacie', pharmacieSchema);

module.exports = Pharmacie;
