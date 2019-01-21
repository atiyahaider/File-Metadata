const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const upload = multer({limits: {fileSize: 10000000} });
const port = process.env.PORT || 3000;

app.use(cors());

// Serve static assets (CSS)
app.use(express.static(__dirname + "/public"))

// Serve the index.HTML file 
app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));

// File upload POST
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  console.log(req.file)
          if (req.file) 
            res.json({name: req.file.originalname, size: req.file.size});
          else 
            res.json({error: 'File not uploaded'});
        }
);

// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'Path Not Found'});
})

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode = err.status || 500;
  let errMessage = err.message || 'Internal Server Error';

  console.log(errCode + ' ' + errMessage);
  res.status(errCode).type('txt').send(errMessage);
})

//start up server
app.listen(port, () => console.log('Node.js listening ...'));