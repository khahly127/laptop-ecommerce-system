import express from "express";
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("Hello World updated")
})
app.get("/hoidanit", (req, res) => {
    res.send("Hello Ly")
})
app.listen(port, () => {
    console.log(`My app is running on port: ${port} `);
    console.log("env port: ", process.env.PORT);
})