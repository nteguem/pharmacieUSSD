const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 2500;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/run-puppeteer', async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const downloadPath = path.resolve('./downloads');

    // Vérifiez si le dossier de téléchargement existe, sinon créez-le
    if (!fs.existsSync(downloadPath)) {
      fs.mkdirSync(downloadPath);
    }

    // Configurer le chemin de téléchargement
    const client = await page.target().createCDPSession();
    await client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: downloadPath
    });

    await page.goto('https://ebulletin.minfi.cm');

    // Attendre que l'élément soit visible
    await page.waitForSelector('#MC_lUserName', { timeout: 40000 });

    // Remplir le formulaire de connexion
    await page.type('#MC_lUserName', '514771U');
    await page.type('#MC_lPassword', 'sUCEV@iFicMLrL6');

    // Cliquer sur le bouton de connexion
    await page.click('#MC_btn_login');

    // Attendre que la nouvelle page se charge après la connexion
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    // Cliquer sur le bouton de téléchargement
    await page.click('#MC_fbpdf_btndSummit');

    // Attendre que le fichier soit complètement téléchargé
    let latestFile;
    await new Promise((resolve) => {
      const interval = setInterval(() => {
        const files = fs.readdirSync(downloadPath);
        latestFile = files.find(file => file.endsWith('.pdf') && !file.endsWith('.crdownload'));
        if (latestFile) {
          clearInterval(interval);
          resolve();
        }
      }, 1000);
    });

    const filePath = path.join(downloadPath, latestFile);
    const fileBuffer = fs.readFileSync(filePath);

    // Supprimer le fichier après lecture pour éviter l'encombrement du dossier
    fs.unlinkSync(filePath);

    // Fermer le navigateur Puppeteer
    await browser.close();

    // Envoyer le fichier en réponse
    res.contentType("application/pdf");
    res.send(fileBuffer);
  } catch (error) {
    console.error('Puppeteer error:', error);
    res.status(500).send('An error occurred while running Puppeteer script');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
