const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
const ConnectDB = require("./utils/db");
const routerUser = require("./router/curd-router")

app.use(express.json());
app.use(cors());

app.use("/api", routerUser)

ConnectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running http://localhost:${PORT}`);
  });
});
