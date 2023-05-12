import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as jose from "jose";
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ status:false,  message: 'Only POST requests allowed' })
    }
    const body = req.body

    const check =  await prisma.user.findFirst({
        where: {
            email: body.email,
        },
    })
    if (check)
    {
        return res.status(401).json({ status:false,  message: 'Email already used' })
    }

    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: await bcrypt.hash(body.password, 10),
            city: body.city,
        },
    });

    if (user!==null)
    {
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

        return res.status(200).json({ status:true,  message: 'Register success',response : payload})
    }
    return res.status(401).json({ status:false,  message: "An error occurred" })
}
