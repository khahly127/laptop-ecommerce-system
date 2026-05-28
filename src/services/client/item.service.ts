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
        await prisma.cart.update({
            where: { id: cart.id },
            data: {
                sum: {
                    increment: quantity
                }
            }
        })
        const currentCartDetail = await prisma.cartDetail.findFirst({
            where: {
                productId: productId,
                cartId: cart.id
            }
        })
        await prisma.cartDetail.upsert({
            where: {
                id: currentCartDetail?.id ?? 0
            },
            update: {
                quantity: {
                    increment: quantity
                }
            },
            create: {
                price: product.price,
                quantity: quantity,
                productId: productId,
                cartId: cart.id
            },
        })
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
const getProductInCart = async (userId: number) => {
    const cart = await prisma.cart.findUnique({
        where: { userId }
    })
    if (cart) {
        const currentCartDetail = await prisma.cartDetail.findMany({
            where: { cartId: cart.id },
            include: { product: true }
        })
        return currentCartDetail
    }
    return [];
}
const deleteProductInCart = async (cartDetailId: number, userId: number, sumCart: number) => {
    // xóa cart-detail
    await prisma.cartDetail.delete({
        where: { id: cartDetailId }
    })
    if (sumCart === 1) {
        //delete cart
        await prisma.cart.delete({
            where: { userId }
        })
    } else {
        //update
        await prisma.cart.update({
            where: { userId },
            data: {
                sum: {
                    decrement: 1,
                }
            }
        })
    }

}
export { getProducts, getProductById, addProductToCart, getProductInCart, deleteProductInCart }