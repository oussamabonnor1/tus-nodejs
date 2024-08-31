const fastify = require('fastify')({ logger: true });
const { Server } = require('@tus/server');
const { FileStore } = require('@tus/file-store');

const tusServer = new Server({
    path: '/files',
    datastore: new FileStore({ directory: './files' })
})

fastify.addContentTypeParser(
    'application/offset+octet-stream', (request, payload, done) => done(null)
);
fastify.all('/files', (req, res) => {
    tusServer.handle(req.raw, res.raw);
});
fastify.all('/files/*', (req, res) => {
    tusServer.handle(req.raw, res.raw);
});
fastify.all('/', (req, res) => {
    res.send({ "hello": "world" })
});
fastify.listen(4000, (err) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});