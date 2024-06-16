const exress = require("express")
const app = exress()
const port = 5000
const cors = require('cors')
const router = require("./router/task-router")
const ConnectDB = require("./utils/db")

app.use(exress.json())
app.use(cors())

app.use("/api/task", router)


ConnectDB().then(() => {
    app.listen(port, () => {
        console.log(`server is running http://localhost:${port}`);
    })
})
