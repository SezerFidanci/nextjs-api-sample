import { PrismaClient } from "@prisma/client";
import {middleware} from "../../../middlewares/authorization";
const prisma = new PrismaClient();

export default async function handler(req, res) {
    const authUser= await middleware(req,res)

    const user =  await prisma.user.findUnique({
        where: {
            id: req.query.id,
        },
    })
    if (user){
        return res.status(200).json({ status:true,  message: 'User details',response : user})
    }
    return res.status(404).json({ status:false,  message: 'User not found',response : null})
}
