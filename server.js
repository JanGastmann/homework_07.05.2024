const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

const storage = multer.diskStorage({
 destination: function (req, file, cb) {
 cb(null, 'uploads/')
 },
 filename: function (req, file, cb) {
 cb(null, file.originalname)
 }
})

const upload = multer({ storage: storage })

app.use(express.static(path.join(__dirname, 'public')));

app.post('/upload', upload.single('file'), (req, res) => {
 res.send('Datei wurde Hochgeladen');
});

app.get('/files', (req, res) => {
  fs.readdir('uploads', (err, files) => {
  if (err) {
  res.status(500).send(err);
  } else {
  res.json(files);
  }
  });
 });
 
app.get('/', (req, res) => {
 res.sendFile(path.join(__dirname, 'public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});

