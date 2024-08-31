const http = require('http');
const express = require("express");
const { Server } = require('@tus/server');
const { FileStore } = require('@tus/file-store');

const port = 4000;
const app_name = "app1";

const app = express();

// Set up tus server
const tusServer = new Server({
    path: '/files',
    datastore: new FileStore({ directory: '/files' }) // Directory to store uploaded files
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
server.listen(port, () => {
    console.log(`${app_name} is running on http://localhost:${port}`);

});