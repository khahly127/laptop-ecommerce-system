import { Request, Response } from "express";

const getProductPage = async (req: Request, res: Response) => {
    return res.render("client/product/show.ejs");
}
export { getProductPage };