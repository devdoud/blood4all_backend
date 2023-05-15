
import { prisma } from '../../../lib/prismadb'

export default async function handler(req, res) {

    const method = req.method;

    switch (method) {
        case 'GET':
            try {
                const doctor = await prisma.doctor.findMany();
                res.status(200).json({doctor});
            } catch (error) {
                res.status(404).json({message: 'Desole impossible de recurer les differents docteur sur cette application'});

            } finally {
                await prisma.$disconnect;
            }
            break;
    
        default:
            res.status(401).json({message: `La methode ${methode} n'est pas autorisee !`})
            break;
    }
}