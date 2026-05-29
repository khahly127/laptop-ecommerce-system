import { createUsersAPI, deleteUserIdAPI, getAllUserAPI, getUserbyIdAPI, updateUserIdAPI } from 'controllers/client/api.controller';
import express, { Express } from 'express';

const router = express.Router();
const apiRoutes = (app: Express) => {
    router.get("/users", getAllUserAPI);
    router.get("/users/:id", getUserbyIdAPI);
    router.post("/users", createUsersAPI),
        router.put("/users/:id", updateUserIdAPI),
        router.delete("/users/:id", deleteUserIdAPI),
        app.use("/api", router);
}
export default apiRoutes;