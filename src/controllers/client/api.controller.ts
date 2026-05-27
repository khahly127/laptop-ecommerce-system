import { Request, Response } from "express"
import { handleGetAllUser, handleGetUserbyID } from "services/client/api.service"
import { registerNewUser } from "services/client/auth.service";
import { RegisterSchema, TRegisterSchema } from "src/validation/register.schema";
import { date } from "zod";

const getAllUserAPI = async (req: Request, res: Response) => {
    const users = await handleGetAllUser();
    res.status(200).json({
        data: users
    });
}
const getUserbyIdAPI = async (req: Request, res: Response) => {
    const { id } = req.params
    const users = await handleGetUserbyID(+id);
    res.status(200).json({
        data: users
    });
}
const createUsersAPI = async (req: Request, res: Response) => {
    const { fullName, email, password } = req.body as TRegisterSchema;
    const validate = await RegisterSchema.safeParseAsync(req.body);
    if (!validate.success) {
        const errorsZod = validate.error.issues;
        const errors = errorsZod?.map(item => `${item.path[0]}: ${item.message}`);
        res.status(400).json({
            errors: errors
        })
        return;
    }
    // success
    await registerNewUser(fullName, email, password);
    res.status(201).json({
        date: "create user succeed"
    })
}
export {
    getAllUserAPI, getUserbyIdAPI, createUsersAPI
}