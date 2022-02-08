const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const port = 2222;
const app = express();

const url = "mongodb://localhost/SuperMarket";

mongoose.connect(url).then(()=>{
    console.log("Database is ready to Go>>>...!");
});

app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use("/", require("./router/Router"))

app.listen(port, ()=>{
    console.log(`Listening to Port:${port}`);
})