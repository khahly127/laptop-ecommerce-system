import express from "express";
import webRoutes from "./routes/web";
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

// config view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// config routes
webRoutes(app);

// config static files
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`My app is running on port: ${port} `);
    console.log("env port: ", process.env.PORT);
    console.log(__dirname);
})