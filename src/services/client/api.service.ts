import { prisma } from "config/client"


const handleGetAllUser = async () => {
    return await prisma.user.findMany()
}
const handleGetUserbyID = async (id: number) => {
    return await prisma.user.findUnique({
        where: { id }
    })
}
export {
    handleGetAllUser, handleGetUserbyID
}