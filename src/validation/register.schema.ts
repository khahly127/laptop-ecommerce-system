import path from "path";
import { isEmailExist } from "services/client/auth.service";
import * as z from "zod";

const passwordSchema = z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
    .refine((password) => /[A-Z]/.test(password), {
        message: "Mật khẩu phải chứa ít nhất một chữ cái viết hoa",
    })
    .refine((password) => /[a-z]/.test(password), {
        message: "Mật khẩu phải chứa ít nhất một chữ cái viết thường",
    })
    .refine((password) => /[0-9]/.test(password), {
        message: "Mật khẩu phải chứa ít nhất một chữ số",
    })
    .refine((password) => /[!@#$%^&*(),.?":{}|<>]/.test(password), {
        message: "Mật khẩu phải chứa ít nhất một ký tự đặc biệt",
    });

const emailSchema = z.string().email("Email không đúng định dạng")
    .refine(async (email) => {
        const existingUser = await isEmailExist(email);
        return !existingUser;
    }, {
        message: " Email đã tồn tại",
        path: ["email"]
    }
    );
export const RegisterSchema = z.object({
    fullName: z.string().trim().min(1, { message: "tên không được để trống" }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
});

export type TRegisterSchema = z.infer<typeof RegisterSchema>;