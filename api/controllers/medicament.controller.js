const MedicamentService = require('../services/medicament.service');
const ResponseService = require('../services/response.service');
const {deleteCSVFile} = require('../services/generateCsv.service')

async function createMedicament(req, res) {
  const data = req.body;
  const response = await MedicamentService.createMedicament(data);
  if (response.success) {
    return ResponseService.created(res, { message: response.message });
  } else {
    return ResponseService.internalServerError(res, { error: response.error });
  }
}

async function updateMedicament(req, res) {
  const id = req.query.id;
  const updatedData = req.body;
  const response = await MedicamentService.updateMedicament(id, updatedData);
  if (response.success) {
    return ResponseService.success(res, { message: response.message,medicament: response.medicament });
  } else {
    if (response.error === 'Medicament non trouvé') {
      return ResponseService.notFound(res, { message: response.error });
    } else {
      return ResponseService.internalServerError(res, { error: response.error });
    }
  }
}

async function deleteMedicament(req, res) {
  const id = req.query.id;
  const response = await MedicamentService.deleteMedicament(id);
  if (response.success) {
    return ResponseService.success(res, { message: response.message });
  } else {
    if (response.error === 'Medicament non trouvé') {
      return ResponseService.notFound(res, { message: response.error });
    } else {
      return ResponseService.internalServerError(res, { error: response.error });
    }
  }
}

async function listMedicaments(req, res) {
   
      const response = await MedicamentService.listMedicaments();
      if (response.success) {
        return ResponseService.success(res, { medicaments: response.medicaments });
      } else {
        return ResponseService.internalServerError(res, { error: response.error });
      }
  }

async function generateAndDownloadCSV(req, res) {
    try {
      const filePath = await MedicamentService.download();
      res.download(filePath, filePath, (err) => {
        if (err) {
          console.error('Error downloading CSV file:', err);
          return ResponseService.internalServerError(res, { error: 'Error downloading CSV file' });
        } else {
          console.log('CSV file downloaded successfully');
          deleteCSVFile(filePath);
        }
      });
    } catch (error) {
      console.error('Error generating CSV file:', error);
      return ResponseService.internalServerError(res, { error: 'Error generating CSV file' });
    }
  }

module.exports = {
  createMedicament,
  updateMedicament,
  deleteMedicament,
  listMedicaments,
  generateAndDownloadCSV
}