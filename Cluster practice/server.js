const cluster = require('cluster');
const os = require('os');
const express = require('express');

const numCPUs = os.cpus().length;
const PORT = 5000;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        // Optionally, you can fork a new worker here
        cluster.fork();
    });
} else {
    const app = express();

    app.get('/', (req, res) => {
        res.send('Hello from worker ' + process.pid);
    });

    app.get('/kill', (req, res) => {
        res.send('Killing worker ' + process.pid);
    });

    app.get("/health", (req, res) => {
        res.send("Worker is healthy");
    })

    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} started`);
    });
}