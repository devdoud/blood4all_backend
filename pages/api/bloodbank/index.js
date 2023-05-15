
import { prisma } from '../../../lib/prismadb'

export default async function handler(req, res) {

    const method = req.method;

    switch (method) {
        case 'GET':
            try {
                const bloodBank = await prisma.bloodBank.findMany();
                res.status(200).json({bloodBank});
            } catch (error) {
                res.status(404).json({message: 'Desole impossible de recuperer toutes les banques de sang'});

            } finally {
                await prisma.$disconnect;
            }
            break;
    
        default:
            res.status(401).json({message: `La methode ${methode} n'est pas autorisee !`})
            break;
    }
}