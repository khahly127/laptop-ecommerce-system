import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import "dotenv/config"

const checkValidJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Token is missing or invalid" });
    }
    try {
        // 3. Sử dụng token đã được xác nhận là string
        const dataDecoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
        console.log(dataDecoded);
        req.user = dataDecoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token is expired or invalid" });
    }
}
export { checkValidJWT }