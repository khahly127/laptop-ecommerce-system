import express, { Express } from "express";
import { get } from "http";
import { getHomePage } from "../controllers/user.controller";

const router = express.Router();
const webRoutes = (app: Express) => {
    router.get("/", getHomePage);
    router.get("/hoidanit", (req, res) => {
        res.send("Hello Ly")
    })
    router.get("/abc", (req, res) => {
        res.send("<b style='color: red;'> Hello Ly </b>")
    })
    app.use("/", router);
}
export default webRoutes;