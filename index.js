const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;


app.use(express.json());
const routes = require("./routes/route")
app.use("/api/v1",routes);
const dbConnect = require("./config/db");
dbConnect();
app.listen(PORT , ()=>{
    console.log("Server is running");
})
