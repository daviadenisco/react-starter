const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const { NODE_ENV } = process.env;

// Middleware
app.use(bodyParser.json());

// Serve static files on behalf of the client
app.use(express.static(path.join(__dirname, '..', 'build')));

// Handle React routing by returning all requests to client
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`Proxy server listening on port ${PORT}!`));
