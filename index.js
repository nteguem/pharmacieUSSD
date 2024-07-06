const Tesseract = require('tesseract.js');
const fs = require('fs');

Tesseract.recognize(
  'https://res.cloudinary.com/nwccompany/image/upload/v1716985776/verso.jpg_admin.jpg',
  'eng',
  { logger: m => console.log(m) }
).then(({ data: { text } }) => {
  console.log(text);
})