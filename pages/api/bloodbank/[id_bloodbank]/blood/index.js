import { prisma } from '@/lib/prismadb';

export default async function handler(req, res) {
    const method = req.method;

    switch (method) {
        case 'GET':
            try {
                const bloods = await prisma.blood.findMany();
                res.status(200).json({ bloods });
            } catch (error) {
                res.status(404).json({ message: 'Desole impossible de recuperer les sang' });
            } finally {
                await prisma.$disconnect();
            }
            break;

        case 'POST':
            const { bloodGroupe, quantity, typeproduit } = req.body;
            console.log(method);

            try {
                const blood = await prisma.blood.create({
                    data: {
                        bloodGroupe: bloodGroupe,
                        quantity: quantity,
                        productType: typeproduit
                    }
                });

                res.status(200).json({ blood });
            } catch (error) {
                res.status(404).json({ message: "desole votre requette ne peut point aboutir" });
            } finally {
                await prisma.$disconnect();
            }
            break;

        default:
            res.status(401).json({ message: `La methode ${method} n'est pas autorisee !` });
            break;
    }
}
