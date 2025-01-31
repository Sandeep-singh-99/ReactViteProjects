const express = require('express')
const app = express()
const PORT = 5000
const { readFileSync } = require('fs')
const { dirname } = require('path')
const { fileURLToPath } = require('url')

app.use(express.json())


app.get("/", (req, res) => {
    res.send("Hello World")
})

app.get("/videos", (req, res) => {
    const file = `${__dirname}/public/video1.mkv`

    res.sendFile(file)
})

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
    
})