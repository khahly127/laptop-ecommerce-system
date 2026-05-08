import express from "express";
import webRoutes from "./routes/web";
import 'dotenv/config';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

// config view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config routes
webRoutes(app);

// config static files
app.use(express.static(path.join(__dirname, '..', 'public')));

app.listen(port, () => {
    console.log(`My app is running on port: ${port} `);
    console.log("env port: ", process.env.PORT);
    console.log(__dirname);
})