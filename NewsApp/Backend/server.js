require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const everythingRouter = require("./router/everything-router");

app.use(express.json());
app.use(cors());

app.use("/api/news", everythingRouter);

app.listen(process.env.PORT, () => {
    console.log(`server is running http://localhost:${process.env.PORT}`);
});
