import { createUsersAPI, deleteUserIdAPI, getAllUserAPI, getUserbyIdAPI, loginAPI, updateUserIdAPI } from 'controllers/client/api.controller';
import express, { Express } from 'express';
import { checkValidJWT } from 'src/middleware/jwt.middleware';

const router = express.Router();
const apiRoutes = (app: Express) => {
    router.get("/users", checkValidJWT, getAllUserAPI);
    router.get("/users/:id", getUserbyIdAPI);
    router.post("/users", createUsersAPI);
    router.put("/users/:id", updateUserIdAPI);
    router.delete("/users/:id", deleteUserIdAPI);
    router.post("/login", loginAPI);
    app.use("/api", router);
}
export default apiRoutes;