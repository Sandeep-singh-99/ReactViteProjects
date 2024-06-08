const express = require("express")
const app = express()
const port = 3000
const cors = require("cors")
const router = require("./Router/todo_router")
const ConnectDB = require("./Utils/db")

app.use(express.json())
app.use(cors())

app.use("/api/todo", router)

ConnectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running http://localhost:${port}`);
    })
})

