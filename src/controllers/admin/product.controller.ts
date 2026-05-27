import { Request, Response } from "express";
import validate from "node_modules/uuid/dist/cjs/validate";
import { createProduct, getProductById, handleDeleteProduct, updateProductbyId } from "services/admin/product.service";
import { ProductSchema, TProductSchema } from "src/validation/user.schema";
const getAdminCreateProduct = async (req: Request, res: Response) => {
    const errors: never[] = [];
    const oldData = {
        name: "",
        price: "",
        detailDesc: "",
        shortDesc: "",
        quantity: "",
        factory: "",
        target: "",
    };
    return res.render("admin/product/create.ejs", { errors, oldData });
}
const postAdminCreateProduct = async (req: Request, res: Response) => {
    // handle create product logic here
    const { name, price, detailDesc, shortDesc, quantity, factory, target } = req.body as TProductSchema;
    const validate = ProductSchema.safeParse(req.body);
    if (!validate.success) {
        const errorsZod = validate.error.issues;
        const errors = errorsZod?.map(item => `${item.path[0]}: ${item.message}`);
        const oldData = {
            name, price, detailDesc, shortDesc, quantity, factory, target
        };
        return res.render("admin/product/create.ejs", { errors, oldData });
    }
    // create product
    const image = req?.file?.filename ?? "";
    await createProduct(name, +price, detailDesc, shortDesc, +quantity, factory, target, image);
    return res.redirect("/admin/product");
}

const postDeleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    await handleDeleteProduct(+id);
    return res.redirect("/admin/product");
}
const getViewProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await getProductById(+id);
    const factoryOptions = [
        { name: "Apple (MacBook)", value: "APPLE" },
        { name: "Asus", value: "ASUS" },
        { name: "Lenovo", value: "LENOVO" },
        { name: "Dell", value: "DELL" },
        { name: "LG", value: "LG" },
        { name: "Acer", value: "ACER" },
    ];

    const targetOptions = [
        { name: "Gaming", value: "GAMING" },
        { name: "Sinh viên - Văn phòng", value: "SINHVIEN-VANPHONG" },
        { name: "Thiết kế đồ họa", value: "THIET-KE-DO-HOA" },
        { name: "Mỏng nhẹ", value: "MONG-NHE" },
        { name: "Doanh nhân", value: "DOANH-NHAN" },
    ];
    return res.render("admin/product/detail.ejs", { product, factoryOptions, targetOptions });
}
const postUpdateProduct = async (req: Request, res: Response) => {
    const { id, name, price, detailDesc, shortDesc, quantity, factory, target } = req.body as TProductSchema & { id: string };
    const image = req?.file?.filename ?? "";
    await updateProductbyId(+id, name, +price, detailDesc, shortDesc, +quantity, factory, target, image);
    return res.redirect("/admin/product");
}

export { getAdminCreateProduct, postAdminCreateProduct, postDeleteProduct, getViewProduct, postUpdateProduct };