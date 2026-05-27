import { createUsersAPI, getAllUserAPI, getUserbyIdAPI } from 'controllers/client/api.controller';
import express, { Express } from 'express';

const router = express.Router();
const apiRoutes = (app: Express) => {
    router.get("/users", getAllUserAPI);
    router.get("/users/:id", getUserbyIdAPI);
    router.post("/users", createUsersAPI)
    app.use("/api", router);
}


export default apiRoutes;