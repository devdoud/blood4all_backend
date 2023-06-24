
import { prisma  } from "../lib/prismadb"

async function main() {

    // creer des banques de sang, tout en creant les sang qu'ils contiendront

    const CNHU = await prisma.bloodBank.upsert({
        where: {nameBankBlood: 'CNHU-HKM'},
        update: {},
        create: {
            nameBankBlood: 'CNHU-HKM',
            adresse: 'Cotonou en face de la presidence.',
            email: 'hkmcontact@gmail.com',
            telephone: "0022996101420",
            longitude: 7,
            lagitude: 5,
            blood: {
                create: [
                    {
                        bloodGroupe: 'O+',
                        quantity: 300,
                        productType: 'globule rouge',
                    },
                    {
                        bloodGroupe: 'O+',
                        quantity: 300,
                        productType: 'globule rouge',
                    },
                    {
                        bloodGroupe: 'O+',
                        quantity: 300,
                        productType: 'plasma frais congele',
                    },
                    {
                        bloodGroupe: 'O-',
                        quantity: 300,
                        productType: 'plama frais congele',
                    },
                    {
                        bloodGroupe: 'O-',
                        quantity: 300,
                        productType: 'plasma albumine',
                    },
                    {
                        bloodGroupe: 'A+',
                        quantity: 300,
                        productType: 'plasma albumine',
                    }, {
                        bloodGroupe: 'A+',
                        quantity: 300,
                        productType: 'globule rouge',
                    },
                    {
                        bloodGroupe: 'A-',
                        quantity: 300,
                        productType: 'plasma albumine',
                    },
                    {
                        bloodGroupe: 'AB+',
                        quantity: 300,
                        productType: 'plasma frais congele',
                    },
                    {
                        bloodGroupe: 'AB-',
                        quantity: 300,
                        productType: 'plasma albumine',
                    },
                ] 
            }
        }
    })

    const HOMEL = await prisma.bloodBank.upsert({
        where: {nameBankBlood: 'CHU-MEL(HOMEL)'},
        update: {},
        create: {
            nameBankBlood: 'CHU-MEL(HOMEL)',
            adresse: 'Cotonou',
            email: 'melcontact@gmail.com',
            telephone: "0022996101420",
            longitude: 2,
            lagitude: 3,
            blood: {
                create: [
                    {
                        bloodGroupe: 'O+',
                        quantity: 600,
                        productType: 'plasma albumine',
                    },
                    {
                        bloodGroupe: 'O-',
                        quantity: 900,
                        productType: 'globule rouge',
                    },
                    {
                        bloodGroupe: 'O+',
                        quantity: 1200,
                        productType: 'plasma albumine',
                    },
                    {
                        bloodGroupe: 'O-',
                        quantity: 300,
                        productType: 'plasma albumine',
                    },
                    {
                        bloodGroupe: 'O-',
                        quantity: 900,
                        productType: 'plasma frais congele',
                    },
                    {
                        bloodGroupe: 'A+',
                        quantity: 300,
                        productType: 'plasma frais congele',
                    }, {
                        bloodGroupe: 'A+',
                        quantity: 300,
                        productType: 'plasma albumine',
                    },
                    {
                        bloodGroupe: 'A-',
                        quantity: 300,
                        productType: 'globule rouge',
                    },
                    {
                        bloodGroupe: 'AB+',
                        quantity: 300,
                        productType: 'globule rouge',
                    },
                    {
                        bloodGroupe: 'AB-',
                        quantity: 300,
                        productType: 'plasma frais congele',
                    },
                ] 
            }
        }
    })

}

main()

  .then(async () => {

    await prisma.$disconnect()

  })

  .catch(async (e) => {

    console.error(e)

    await prisma.$disconnect()

    process.exit(1)

  })