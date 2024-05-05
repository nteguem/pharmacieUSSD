const PharmacieService = require('../services/pharmacie.service');
const ResponseService = require('../services/response.service');
const {deleteCSVFile} = require('../services/generateCsv.service');

async function createPharmacie(req, res) {
  const data = req.body;
  const response = await PharmacieService.createPharmacie(data);
  if (response.success) {
    return ResponseService.created(res, { message: response.message });
  } else {
    return ResponseService.internalServerError(res, { error: response.error });
  }
}

async function updatePharmacie(req, res) {
  const id = req.query.id;
  const updatedData = req.body;
  const response = await PharmacieService.updatePharmacie(id, updatedData);
  if (response.success) {
    return ResponseService.success(res, { message: response.message,pharmacie: response.pharmacie });
  } else {
    if (response.error === 'Pharmacie non trouvé') {
      return ResponseService.notFound(res, { message: response.error });
    } else {
      return ResponseService.internalServerError(res, { error: response.error });
    }
  }
}

async function deletePharmacie(req, res) {
  const id = req.query.id;
  const response = await PharmacieService.deletePharmacie(id);
  if (response.success) {
    return ResponseService.success(res, { message: response.message });
  } else {
    if (response.error === 'Pharmacie non trouvé') {
      return ResponseService.notFound(res, { message: response.error });
    } else {
      return ResponseService.internalServerError(res, { error: response.error });
    }
  }
}

async function listPharmacie(req, res) {
   
      const response = await PharmacieService.listPharmacie();
      if (response.success) {
        return ResponseService.success(res, { pharmacies: response.pharmacies});
      } else {
        return ResponseService.internalServerError(res, { error: response.error });
      }
  }

async function generateAndDownloadCSV(req, res) {
    try {
      const filePath = await PharmacieService.download();
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
  createPharmacie,
  updatePharmacie,
  deletePharmacie,
  listPharmacie,
  generateAndDownloadCSV
}