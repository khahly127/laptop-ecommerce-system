import { prisma } from "config/client";

const getProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
}
const getProductById = async (id: number) => {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    });
    return product;
}
const addProductToCart = async (quantity: number, productId: number, user: Express.User) => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId: user.id
        }
    });
    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    })
    if (!product) {
        throw new Error('Product not found');
    }
    if (cart) {
        //update
    } else {
        //create
        await prisma.cart.create({
            data: {
                sum: quantity,
                userId: user.id,
                cardDetails: {
                    create: [
                        {
                            price: product.price,
                            quantity: quantity,
                            productId: productId
                        }
                    ]
                }
            }
        })
    }
}
export { getProducts, getProductById, addProductToCart }