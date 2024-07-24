const express = require("express")
const app = express()
const cors = require("cors")
const PORT = 5000
const ConnectDB = require("./utiles/db")
const productRouter = require("./router/product-router")

app.use(express.json())
app.use(cors())

app.use("/api/user", productRouter)

ConnectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running http:localhost:${PORT}`);
    })
})