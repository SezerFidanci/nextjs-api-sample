import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export default async function handler(req, res) {

   const user = await prisma.user.create({
        data: {
            name: 'Bob',
            email: 'bob@prismaw.iow',
            age: 2 + '',
            address: 'lorem ipsum dolor',
            school: 'lorem ipsum',
            city: 'lorem city',
        },
    });


    res.json({state: user})
}
