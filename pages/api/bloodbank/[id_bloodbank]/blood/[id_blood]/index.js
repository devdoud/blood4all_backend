

import { prisma } from "../../../../../../lib/prismadb"

export default async function handler(req, res) {
    const method = req.method

    console.log(req.query.id_blood)

    switch (method) {
        case 'GET':
            
            try {
                const blood = await prisma.blood.findUnique({
                    where: {
                        id: req.query.id_blood
                    }
                })

                res.status(200).json({blood})
            } catch (error) {
                res.status(404).json({message: 'impossible de recuperer ce sang'})
            } finally {
                await prisma.$disconnect
            }

            break;

        case 'PATCH': 

            const { bloodGroupe, quantity } = req.body

            try {
                const blood = await prisma.blood.update({
                    where: {
                        id: req.query.id_blood
                    },
                    data: {
                        bloodGroupe: bloodGroupe,
                        quantity: quantity
                    }
                })

                res.status(200).json({blood})

            } catch (error) {
                res.status(404).json({message: 'impossible de mettre a jour ce sang'})
            } finally {
                await prisma.disconnect
            }

            break;

        case 'DELETE': 
            try {
                const blood = await prisma.blood.delete({
                    where: {
                        id: req.query.id_blood
                    }
                })
                
                res.status(200).json({blood})

            } catch (error) {
                console.log(error)
                res.status(404).json({message: 'impossible de supprimer ce sang'})
            } finally {
                await prisma.$disconnect
            }
            break;
    
        default:
            res.status(401).json({message: `La methode ${methode} n'est pas autorisee !`})
            break;
    }
}