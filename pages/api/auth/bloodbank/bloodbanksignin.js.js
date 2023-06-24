import { prisma } from '@/lib/prismadb';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { serialize } from "cookie";

export default async function handler(req, res) {

    const { email, password } = req.body;

    const bloodbank = await prisma.bloodBank.findUnique({
        where: {
            email: email
        }
    })

    if(bloodbank && bcrypt.compareSync(password, bloodbank.password)) {

        const token = jwt.sign(
            {
                id: bloodbank.id,
                email: bloodbank.email,
            },
           'blood',
           {expiresIn: '1h'} 
        );
        
        // const serialized = serialize("bloodforall", token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === "production",
        //     sameSite: "strict",
        //     maxAge: 1 * 60 * 60,
        //     path: "/"
        // })

        // res.setHeader("Set-Cookie", serialized);

        return res.status(200).json({ bloodbank });
    }


    res.status(401).json({ message: "Password ou Email incorrecte" })

}