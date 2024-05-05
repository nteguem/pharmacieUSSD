const Pharmacie = require('../models/pharmacie.model');
const {generateAndDownloadCSV} = require('./generateCsv.service');

async function createPharmacie(data) {
    try {
        const newMPharmacie = new Pharmacie(data);
        await newMPharmacie.save();
        return { success: true, message: 'Pharmacie ajouté avec succès' };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function updatePharmacie(id, updatedData) {
    try {
        const pharmacie = await Pharmacie.findByIdAndUpdate(id, updatedData, { new: true });
        if (!pharmacie) {
            return { success: false, error: 'Pharmacie non trouvé' };
        }
        return { success: true, message: 'Pharmacie mis à jour avec succès', pharmacie };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function deletePharmacie(id) {
    try {
        const pharmacie = await Pharmacie.findByIdAndDelete(id);
        if (!pharmacie) {
            return { success: false, error: 'Pharmacie non trouvé' };
        }
        return { success: true, message: 'Pharmacie supprimé avec succès' };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function listPharmacie() {
    try {
        const pharmacies = await Pharmacie.find();
        return { success: true, pharmacies };
    } catch (error) {
        return { success: false, error: error.message };
    }
}


  async function download() {
    try {
      const result = await listPharmacie();
  
      const  formattedPharmacie = result.pharmacies.map(med => {
        const { _id,createdAt,updatedAt,__v, ...rest } = med._doc; 
        return rest;
      });
    return generateAndDownloadCSV(formattedPharmacie,"Liste des pharmacies")
    } catch (error) {
      throw new Error('Error generating CSV file', error);
    }
  }
  


module.exports = {
    createPharmacie,
    updatePharmacie,
    deletePharmacie,
    listPharmacie,
    download
};
