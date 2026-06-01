const http = require('http');
const express = require("express");
const { Server } = require('@tus/server');
const { FileStore } = require('@tus/file-store');

require('dotenv').config();
const PORT = process.env.PORT || 4000;
const APP_NAME = process.env.APP_NAME || "app1";
const LOCAL_STORAGE_PATH = process.env.LOCAL_STORAGE_PATH || './storage';

const app = express();

// Set up tus server
const tusServer = new Server({
    path: '/files',
    datastore: new FileStore({ directory: LOCAL_STORAGE_PATH }) // Directory to store uploaded files
});

// Middleware to handle tus uploads
app.all('/files', (req, res) => {
    tusServer.handle(req, res);
});

app.all('/files/*', (req, res) => {
    tusServer.handle(req, res);
});

app.get("/", (req, res) => {
    res.json({ "hello": "world" });
});

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`${APP_NAME} is running on http://localhost:${PORT}`);

});