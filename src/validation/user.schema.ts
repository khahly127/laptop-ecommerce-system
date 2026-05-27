import * as z from "zod";

export const ProductSchema = z.object({
    name: z.string().trim().min(1, { message: "Không được để trống tên sản phẩm" }),
    price: z.string()
        .transform((val) => (val === "" ? 0 : Number(val)))
        .refine((num) => num > 0, {
            message: "Số tiền tối thiểu là 1",
        }),

    detailDesc: z.string().trim().min(1, { message: "Không được để trống mô tả chi tiết" }),
    shortDesc: z.string().trim().min(1, { message: "Không được để trống mô tả ngắn" }),
    quantity: z.string()
        .transform((val) => (val === "" ? 0 : Number(val)))
        .refine((num) => num > 0, {
            message: "Số lượng sản phẩm phải là số dương",
        }),
    factory: z.string().trim().min(1, { message: "Không được để trống nhà sản xuất" }),
    target: z.string().trim().min(1, { message: "Không được để trống đối tượng sử dụng" }),
});

export type TProductSchema = z.infer<typeof ProductSchema>;