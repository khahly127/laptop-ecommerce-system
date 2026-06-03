import { Request, Response } from "express"
import { handleDeleteUserbyID, handleGetAllUser, handleGetUserbyID, handleUpdateUserbyID, handleUserLogin } from "services/client/api.service"
import { registerNewUser } from "services/client/auth.service";
import { RegisterSchema, TRegisterSchema } from "src/validation/register.schema";

const getAllUserAPI = async (req: Request, res: Response) => {
    const users = await handleGetAllUser();
    const user = req.user;
    console.log("check user: ", user);
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
const updateUserIdAPI = async (req: Request, res: Response) => {
    const { fullName, address, phone } = req.body;
    const { id } = req.params;

    // success
    await handleUpdateUserbyID(+id, fullName, address, phone);
    res.status(200).json({
        date: "update user succeed"
    })
}
const deleteUserIdAPI = async (req: Request, res: Response) => {
    const { id } = req.params;
    await handleDeleteUserbyID(+id);
    res.status(200).json({
        date: "delete user succeed"
    })
}
const loginAPI = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const access_token = await handleUserLogin(username, password);
        res.status(200).json({
            date: {
                access_token
            }
        })
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        res.status(401).json({
            date: null,
            message
        })
    }
}
export {
    getAllUserAPI, getUserbyIdAPI, createUsersAPI, updateUserIdAPI, deleteUserIdAPI, loginAPI
}