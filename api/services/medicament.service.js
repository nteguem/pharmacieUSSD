const Medicament = require('../models/medicament.model');
const {generateAndDownloadCSV} = require('./generateCsv.service');

async function createMedicament(medicamentData) {
    try {
        const newMedicament = new Medicament(medicamentData);
        await newMedicament.save();
        return { success: true, message: 'Medicament ajouté avec succès' };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function updateMedicament(medicamentId, updatedData) {
    try {
        const medicament = await Medicament.findByIdAndUpdate(medicamentId, updatedData, { new: true });
        if (!medicament) {
            return { success: false, error: 'Medicament non trouvé' };
        }
        return { success: true, message: 'Medicament mis à jour avec succès', medicament };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function deleteMedicament(id) {
    try {
        const medicament = await Medicament.findByIdAndDelete(id);
        if (!medicament) {
            return { success: false, error: 'Medicament non trouvé' };
        }
        return { success: true, message: 'Medicament supprimé avec succès' };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function listMedicaments() {
    try {
        const medicaments = await Medicament.find().populate('pharmacies');
        return { success: true, medicaments };
    } catch (error) {
        return { success: false, error: error.message };
    }
}


  async function download() {
    try {
      const result = await listMedicaments();
  
      const  formattedMedicament = result.medicaments.map(med => {
        const { _id,createdAt,updatedAt,__v, ...rest } = med._doc; 
        return rest;
      });
    return generateAndDownloadCSV(formattedMedicament,"Liste des medicaments")
    } catch (error) {
      throw new Error('Error generating CSV file', error);
    }
  }
  


module.exports = {
    createMedicament,
    updateMedicament,
    deleteMedicament,
    listMedicaments,
    download
};
