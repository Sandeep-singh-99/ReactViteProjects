const express = require("express")
const app = express()
const port = 3000
const cors = require("cors")
const router = require("./router/note_router")
const ConnectDB = require("./utils/db")

app.use(express.json())
app.use(cors())

app.use("/api/notemaker", router)

ConnectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running http://localhost:${port}`);
    })
})
