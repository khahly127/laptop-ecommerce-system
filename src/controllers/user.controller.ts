import { Request, Response } from "express";
import { getProducts } from "services/client/item.service";
import { getAllRoles, getAllUsers, getUserById, handleCreateUser, handleDeleteUser, updateUserById } from "services/user-service";
const getHomePage = async (req: Request, res: Response) => {
    const products = await getProducts();
    const user = req.user;
    console.log(">>>current user", user);
    return res.render("client/home/show.ejs", { products: products });
};

const getCreateUserPage = async (req: Request, res: Response) => {
    const roles = await getAllRoles();
    return res.render("admin/user/create.ejs", { roles: roles });
};

const postCreateUserPage = async (req: Request, res: Response) => {
    const { fullName, username, phone, role, address } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? "";
    await handleCreateUser(fullName, username, address, phone, avatar, role);
    return res.redirect("/admin/user");
};
const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    await handleDeleteUser(id);
    return res.redirect("/admin/user");
};

const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    // get user by id
    const user = await getUserById(id);
    const roles = await getAllRoles();
    return res.render("admin/user/detail.ejs", { id: id, user: user, roles: roles });
};
const postUpdateUser = async (req: Request, res: Response) => {
    const { id, fullName, address, phone, role } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? "";
    await updateUserById(id, fullName, address, phone, avatar, role);
    return res.redirect("/admin/user");
}

export { getHomePage, getCreateUserPage, postCreateUserPage, postDeleteUser, getViewUser, postUpdateUser };