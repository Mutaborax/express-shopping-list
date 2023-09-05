const express = require('express');
const items = require('./fakeDb');
const itemRoutes = require('./itemRoutes');

const app = express();

app.use(express.json());
app.use('/items', itemRoutes);

module.exports = app;
