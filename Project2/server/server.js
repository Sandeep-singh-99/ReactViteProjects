require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const PORT = process.env.PORT
const ConnectDB = require("./utils/db")
const router = require("./router/todo-router")

app.use(express.json())
app.use(cors())

app.use("/api", router)

ConnectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running http://localhost:${PORT}`);
    })
}).catch(() => {
    console.log("Database connection failed");
})
