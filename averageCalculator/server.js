const express = require('express');
const numbersController = require('./src/controllers/numbersController');

const app = express();
const port = 3001;

app.use('/numbers', numbersController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already use. Please choose a different port.`);
  } else {
    console.error('Error starting the server:', err);
  }
});