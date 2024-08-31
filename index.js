const { Server } = require('@tus/server')
const { FileStore } = require('@tus/file-store')

const host = '127.0.0.1'
const port = 3000
const server = new Server({
    path: '/files',
    datastore: new FileStore({ directory: './files' }),
})

server.listen({ host, port })