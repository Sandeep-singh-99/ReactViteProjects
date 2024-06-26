const express = require("express")
const app = express()
const port = 5000
const cors = require('cors')
const ConnectDB = require('./utils/db')
const doctorRouter = require("./router/doctor-router")
const appointmentRouter = require("./router/appointments-router")
const patientRouter = require("./router/patients-router")

app.use(express.json())
app.use(cors())

app.use("/doctors", doctorRouter)
app.use("/appointment", appointmentRouter)
app.use("/patients", patientRouter)


ConnectDB().then(() => {
    app.listen(port, () => {
        console.log(`server is running http://localhost:${port}`);
    })
})

