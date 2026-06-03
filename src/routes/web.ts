import express, { Express } from "express";
import { getCreateUserPage, getHomePage, postCreateUserPage, postDeleteUser, getViewUser, postUpdateUser } from "../controllers/user.controller";
import { getAdminOrderDetailPage, getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashboardPage } from "controllers/admin/dashboard.controller";
import fileUploadMiddleware from "src/middleware/multer";
import { getCartPage, getCheckOutPage, getOrderHistoryPage, getProductPage, getThanksPage, postAddProductToCart, postDeleteProductInCart, postHandleCartToCheckOut, postPlaceOrder } from "controllers/client/product.controller";
import { getAdminCreateProduct, getViewProduct, postAdminCreateProduct, postDeleteProduct, postUpdateProduct } from "controllers/admin/product.controller";
import { getLoginPage, getRegisterPage, getSuccessRedirectPage, postLogout, postRegisterPage } from "controllers/client/auth.controller";
import passport from "passport";
import { isAdmin } from "src/middleware/auth";

const router = express.Router();
const webRoutes = (app: Express) => {
    router.get("/", getHomePage);
    router.get("/success-redirect", getSuccessRedirectPage);
    router.get("/product/:id", getProductPage);
    router.get("/login", getLoginPage);
    router.post("/login", passport.authenticate('local', {
        successRedirect: '/success-redirect',
        failureRedirect: '/login',
        failureMessage: true
    }))
    // Register
    router.post("/register", postRegisterPage);
    router.get("/register", getRegisterPage);
    //cart
    router.get("/cart", getCartPage);
    router.post("/add-product-to-cart/:id", postAddProductToCart);
    router.post("/delete-product-in-cart/:id", postDeleteProductInCart);
    // check out
    router.get("/checkout", getCheckOutPage);
    router.post("/handle-cart-to-checkout", postHandleCartToCheckOut);
    router.post("/place-order", postPlaceOrder);
    router.get("/thank", getThanksPage);
    // Logout
    router.post("/logout", postLogout);
    // admin route
    router.get("/admin", getDashboardPage);
    router.get("/admin/user", getAdminUserPage);
    router.get("/admin/create-user", getCreateUserPage);
    router.post("/admin/handle-create-user", fileUploadMiddleware('avatar'), postCreateUserPage);
    router.post("/admin/delete-user/:id", postDeleteUser);
    router.get("/admin/view-user/:id", getViewUser);
    router.post("/admin/update-user", fileUploadMiddleware('avatar'), postUpdateUser);

    router.get("/admin/product", getAdminProductPage);
    router.get("/admin/create-product", getAdminCreateProduct);
    router.post("/admin/create-product", fileUploadMiddleware("image", "image/product"), postAdminCreateProduct);
    router.get("/admin/view-product/:id", getViewProduct);
    router.post("/admin/delete-product/:id", postDeleteProduct);
    router.post("/admin/update-product", fileUploadMiddleware("image", "image/product"), postUpdateProduct);
    router.get("/admin/order", getAdminOrderPage);
    router.get("/admin/order/:id", getAdminOrderDetailPage);
    router.get("/order-history", getOrderHistoryPage);
    app.use("/", isAdmin, router);

}
export default webRoutes;