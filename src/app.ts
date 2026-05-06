import express from "express";

const app = express();
const port = 3000;
app.get("/", (req, res) => {
    res.send("Hello World updated")
})

app.listen(port, () => {
    console.log(`My app is running on port: ${port} `)
})