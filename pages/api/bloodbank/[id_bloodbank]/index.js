
import { prisma } from "../../../../lib/prismadb"

export default async function handler(req, res) {

    const method = req.method

    switch (method) {
        case 'GET':
            
            try {
                const bloodBank = await prisma.bloodBank.findUnique({
                    where: {
                        id: req.query.id_bloodbank
                    }
                })

                res.status(200).json({bloodBank})

            } catch (error) {
                res.status(404).json({message: "desole, vous ne pouvez pas recuperer ce sang"})
            } finally {
                await prisma.$disconnect
            }

            break;
        case 'PATCH': 

            const { nameBankBlood, adresse, longitude, lagitude } = req.body

            try {
                const bloodBank = await prisma.bloodBank.update({
                    where: {
                        id: req.query.id_bloodbank
                    },
                    data: {
                        nameBankBlood: nameBankBlood,
                        adresse: adresse,
                        longitude: longitude,
                        lagitude: lagitude
                    }
                })

                res.status(200).json({bloodBank})
                
            } catch (error) {
                res.status(404).json({message: "impossible de mettre a jour cette banqque de sang"})
            } finally {
                await prisma.$disconnect
            }
            break;
        
        case 'DELETE': 
            
            try {
                const bloodBank = await prisma.bloodBank.delete({
                    where: {
                        id: req.query.id_bloodbank
                    }
                })

                res.status(200).json({ bloodBank })

            } catch (error) {
                res.status(404).json({message: "Impossible de supprimer cette banque de sang"})
            } finally {
                await prisma.$disconnect
            }

            break;
    
        default:
            res.status(401).json({message: `La methode ${method} n'est pas autorise !`})
            break;
    }
}