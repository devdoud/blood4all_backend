import { prisma } from '@/lib/prismadb';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { serialize } from "cookie";


const resolver = async (req, res) => {
    
    if(req.method === 'POST') {
        const { email, password } = req.body;

        const simpleUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if(simpleUser && bcrypt.compareSync(password, simpleUser.password)) {

            const token = jwt.sign(
                {
                    id: simpleUser.id,
                    email: simpleUser.email,
                },
               'blood',
               {expiresIn: '1h'} 
            );

            const serialized = serialize("bloodforall", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1 * 60 * 60,
                path: "/"
            })
    
            res.setHeader("Set-Cookie", serialized);

            return res.status(200).json({ simpleUser, token });
    }

    res.status(401).json({ message: "Password ou Email incorrecte" })
}

}

export default resolver;