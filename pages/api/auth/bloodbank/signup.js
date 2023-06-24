import { prisma } from "../../../../lib/prismadb"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
    const salt = bcrypt.genSaltSync();

    if(req.method === 'POST') {

        if(!req.body) res.status(404).json({ message: "votre formullaire ne contient aucune information" });
        //recuperer les informations du client 
        const {name, addresse, email, telephone, password} = req.body;

        let bank

        try {
                
                bank = await prisma.bloodBank.upsert({
                    where: {  nameBankBlood: name },
                    update: {},
                    create: {
                        nameBankBlood: name,
                        adresse: addresse,
                        email: email,
                        telephone: telephone,
                        password: bcrypt.hashSync(password, salt),
                    }
                }) 
                
                const token = jwt.sign(
                    {
                        id: bank.id,
                        nameBankBlood: bank.nameBankBlood,
                    },
                   'bank',
                   {expiresIn: '1h'} 
                );

                res.status(200).json({ bank, token });
            
        } catch (error) {
            console.log(error);
            res.status(404).json({message: "veuiller bien renseigner toutes les informations demandees"})        
        }

    } else {
        res.status(500).json({ message: "La methode de votre requette est invalide .. on accepte que la methode POST" });   
    }
}
