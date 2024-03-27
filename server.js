const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Set up file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

app.use(express.static('public')); // Serve static files from 'public' directory

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  const fileUrl = \`http://localhost:\${port}/uploads/\${req.file.filename}\`;
  res.json({ fileUrl: fileUrl });
});

// Start the server
app.listen(port, () => {
  console.log(\`Server running at http://localhost:\${port}/\`);
});
