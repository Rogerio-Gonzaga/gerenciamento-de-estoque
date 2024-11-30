const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Inicializa o app
const app = express();

// Configura middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas principais
const routes = require('./routes');
app.use('/api', routes);

module.exports = app;
