import { PrismaClient } from "@prisma/client";


import {middleware} from "../../../middlewares/authorization";
const prisma = new PrismaClient();

export default async function handler(req,res) {
    const authUser= await middleware(req,res)

    const users =  await prisma.user.findMany()
    return res.status(200).json({ status:true,  message: 'Users list',response : users})
}
