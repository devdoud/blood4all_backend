
import { prisma  } from "../lib/prismadb"

async function main() {

    // creer des banques de sang, tout en creant les sang qu'ils contiendront

    const CNHU = await prisma.bloodBank.upsert({
        where: {nameBankBlood: 'CNHU-HKM'},
        update: {},
        create: {
            nameBankBlood: 'CNHU-HKM',
            adresse: 'Cotonou en face de la presidence.',
            longitude: 7,
            lagitude: 5,
            blood: {
                create: [
                    {
                        bloodGroupe: 'O+',
                        quantity: 300
                    },
                    {
                        bloodGroupe: 'O+',
                        quantity: 300
                    },
                    {
                        bloodGroupe: 'O+',
                        quantity: 300
                    },
                    {
                        bloodGroupe: 'O-',
                        quantity: 300
                    },
                    {
                        bloodGroupe: 'O-',
                        quantity: 300
                    },
                    {
                        bloodGroupe: 'A+',
                        quantity: 300
                    }, {
                        bloodGroupe: 'A+',
                        quantity: 300
                    },
                    {
                        bloodGroupe: 'A-',
                        quantity: 300
                    },
                    {
                        bloodGroupe: 'AB+',
                        quantity: 300
                    },
                    {
                        bloodGroupe: 'AB-',
                        quantity: 300
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
            longitude: 2,
            lagitude: 3,
            blood: {
                create: [
                    {
                        bloodGroupe: 'O+',
                        quantity: 600
                    },
                    {
                        bloodGroupe: 'O-',
                        quantity: 900
                    },
                    {
                        bloodGroupe: 'O+',
                        quantity: 1200
                    },
                    {
                        bloodGroupe: 'O-',
                        quantity: 300
                    },
                    {
                        bloodGroupe: 'O-',
                        quantity: 900
                    },
                    {
                        bloodGroupe: 'A+',
                        quantity: 300
                    }, {
                        bloodGroupe: 'A+',
                        quantity: 300
                    },
                    {
                        bloodGroupe: 'A-',
                        quantity: 300
                    },
                    {
                        bloodGroupe: 'AB+',
                        quantity: 300
                    },
                    {
                        bloodGroupe: 'AB-',
                        quantity: 300
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