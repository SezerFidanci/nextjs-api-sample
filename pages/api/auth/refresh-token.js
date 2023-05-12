import {middleware} from "../../../middlewares/authorization";
import { PrismaClient } from "@prisma/client";

import * as jose from 'jose'
const prisma = new PrismaClient();

export default async function handler(req,res) {
    const authUser= await middleware(req,res)

    const user =  await prisma.user.findFirst({
        where: {
            id: authUser.id,
        },
    })
    const secret = new TextEncoder().encode(
        process.env.ACCESS_TOKEN_SECRET
    );

    const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        city: user.city,
    };

    const access_token =await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setIssuer('http://localhost:3000')
        .setAudience('auth')
        .setExpirationTime('1h')
        .sign(secret);

    const refresh_token =await new jose.SignJWT({id:user.id})
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setIssuer('http://localhost:3000')
        .setAudience('auth')
        .setExpirationTime('1w')
        .sign(secret);

    payload.access_token = access_token;
    payload.refresh_token = refresh_token;

    return res.status(200).json({ status:true,  message: 'Refresh token success',response : payload})
}
