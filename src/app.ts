/// <reference path="./types/index.d.ts" />
import express from "express";
import webRoutes from "src/routes/web";
import 'dotenv/config';
import path from 'path';
import initDatabase from "config/seed";
import passport from "passport";
import { configPassPortLocal } from "./middleware/passport.local";
import apiRoutes from "routes/api";
import session from "express-session";
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';

const app = express();
const port = process.env.PORT || 3000;

// 1. Cấu hình view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 2. Cấu hình req.body (Phải nằm trên cùng để đọc dữ liệu form gửi lên)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Cấu hình static files
app.use(express.static('public'));

// 4. Cấu hình session (BẮT BUỘC phải nằm trước các routes và passport)
app.use(session({
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'a santa at nasa',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
        new PrismaClient(),
        {
            checkPeriod: 2 * 60 * 1000,  //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    )
}));

// 5. Cấu hình passport (BẮT BUỘC phải nằm sau session và trước các routes)
app.use(passport.initialize());
app.use(passport.authenticate('session')); // hoặc app.use(passport.session());
configPassPortLocal();

// config global
app.use((req, res, next) => {
    res.locals.user = req.user || null; // Pass user object to all views
    next();
});

// 6. Cấu hình các routes (BẮT BUỘC phải đặt dưới các middleware cấu hình ở trên)
webRoutes(app);
apiRoutes(app);

// 7. Seeding data
initDatabase();

// 8. Handle 404 not found
app.use((req, res) => {
    res.render("status/404.ejs")
});

app.listen(port, () => {
    console.log(`My app is running on port: ${port} `);
    console.log("env port: ", process.env.PORT);
    console.log(__dirname);
});