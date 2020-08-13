// Core modules
const path = require('path');

// NPM modules
const express = require('express');

// Local modules
require('./db/mongoose');


// Routers
const userRouter = require('./routers/user.router');
const forexRouter = require('./routers/forex.router');

const app = express();

// Define paths for Express config
const publicPath = path.join(__dirname, '..', 'public');

// Setup static directory to serve
app.use(express.static(publicPath));
app.use(express.json());
app.use(userRouter);
app.use(forexRouter);

// SPA handling for routes
// IMPORTANT MUST BE PLACED AT END OF ROUTES DEFINITION
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
})

module.exports = app