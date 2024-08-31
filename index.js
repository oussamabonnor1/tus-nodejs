// const { Server } = require('@tus/server')
// const { FileStore } = require('@tus/file-store')

// const host = '127.0.0.1'
// const port = 4000
// const server = new Server({
//     path: '/files',
//     datastore: new FileStore({ directory: './files' }),
// })
// server.listen({ host, port })


const app = express()
app.get("/", (req, res, nex) => {
    res.json({ app: app_name })
})

const server = http.createServer(app);
server.listen(port, () => {

    setInterval(() => {
        console.log(`${app_name} : ${new Date().toISOString()}`);
    }, 1000)
});

