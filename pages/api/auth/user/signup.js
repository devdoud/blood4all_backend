
import bcrypt from "bcrypt"
import { prisma } from "../../../../lib/prismadb"
import jwt from 'jsonwebtoken'

export default async function handler(req, res){
    const salt = bcrypt.genSaltSync();

    if(req.method === 'POST') {
        if(!req.body) res.status(404).json({ message: "Remplissez les differents champs du formulaires" });

        //je recupere les differentes informations du user a la demande d'inscription
        const { firstName, lastName, phoneNumber, email, password } = req.body

        let user

        try {
            user = await prisma.user.upsert(
                {
                    where: { email: email },
                    update: {},
                    create: {
                        firstname: firstName,
                        lastname: lastName,
                        email: email,
                        telephone: phoneNumber,
                        password: bcrypt.hashSync(password, salt),
                    }
                }
            )

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                },
                'simpleuser',
                {expiresIn: '1h'}
            );

            res.status(200).json({ user, token });
        } catch (error) {
            console.log(error);
            res.status(404).json({ message: "veuillez bien reseigner toutes les informations demandees" });
        }
    } else {
        res.status(500).json({ message: "La methode de votre requette est invalide .. on accepte que la methode POST" })
    }
}