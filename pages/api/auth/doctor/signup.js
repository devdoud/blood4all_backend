import bcrypt from "bcrypt"
import { prisma } from "../../../../lib/prismadb"
import { serialize } from "cookie";
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
    const salt = bcrypt.genSaltSync();

    if(req.method === 'POST') {

        if(!req.body) res.status(404).json({ message: "votre formullaire ne contient aucune information" });
        //recuperer les informations du client 
        const {firstname, lastname, email, telephone, password, numOrdreNational, hopital} = req.body;

        let user

        try {
                
                user = await prisma.doctor.upsert({
                    where: {  email: email },
                    update: {},
                    create: {
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        telephone: telephone,
                        password: bcrypt.hashSync(password, salt),
                        numOrdreNational: numOrdreNational,
                        hopital: hopital
                    }
                }) 
                
                const token = jwt.sign(
                    {
                        id: user.id,
                        email: user.email,
                    },
                   'blood',
                   {expiresIn: '1h'} 
                );

                res.status(200).json({ user, token });
            
        } catch (error) {
            console.log(error);
            res.status(404).json({message: "veuiller bien renseigner toutes les informations demandees"})        
        }

    } else {
        res.status(500).json({ message: "La methode de votre requette est invalide .. on accepte que la methode POST" });   
    }
}