
import { prisma  } from "../lib/prismadb"

async function main() {

    // creer des banques de sang, tout en creant les sang qu'ils contiendront

    const bankA = await prisma.bloodBank.upsert({
        where: {nameBankBlood: 'bankA'},
        update: {},
        create: {
            nameBankBlood: 'bankA',
            adresse: 'Maison A a cote de b',
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

    // const bankB = await prisma.bloodBank.upsert({
    //     where: {nameBankBlood: 'bankB'},
    //     update: {},
    //     create: {
    //         nameBankBlood: 'bankB',
    //         adresse: 'Maison B a cote de c',
    //         longitude: 3,
    //         lagitude: 2,
    //         blood: {
    //             create: [
    //                 {
    //                     bloodGroupe: 'O+',
    //                     numberPocket: 20
    //                 },
    //                 {
    //                     bloodGroupe: 'O-',
    //                     numberPocket: 10
    //                 },
    //                 {
    //                     bloodGroupe: 'A+',
    //                     numberPocket: 6
    //                 },
    //                 {
    //                     bloodGroupe: 'A-',
    //                     numberPocket: 5
    //                 },
    //                 {
    //                     bloodGroupe: 'B+',
    //                     numberPocket: 3
    //                 },
    //                 {
    //                     bloodGroupe: 'B-',
    //                     numberPocket: 2
    //                 },
    //                 {
    //                     bloodGroupe: 'AB-',
    //                     numberPocket: 1
    //                 },
    //                 {
    //                     bloodGroupe: 'AB+',
    //                     numberPocket: 3
    //                 },
    //             ]
    //         }
    //     }
    // })

    // const bankC = await prisma.bloodBank.upsert({
    //     where: {nameBankBlood: 'bankC'},
    //     update: {},
    //     create: {
    //         nameBankBlood: 'bankC',
    //         adresse: 'Maison C a cote de d',
    //         longitude: 2,
    //         lagitude: 4,
    //         blood: {
    //             create: [
    //                 {
    //                     bloodGroupe: 'O+',
    //                     numberPocket: 10
    //                 },
    //                 {
    //                     bloodGroupe: 'O-',
    //                     numberPocket: 3
    //                 },
    //                 {
    //                     bloodGroupe: 'A+',
    //                     numberPocket: 2
    //                 },
    //                 {
    //                     bloodGroupe: 'A-',
    //                     numberPocket: 5
    //                 },
    //                 {
    //                     bloodGroupe: 'B+',
    //                     numberPocket: 8
    //                 },
    //                 {
    //                     bloodGroupe: 'B-',
    //                     numberPocket: 7
    //                 },
    //                 {
    //                     bloodGroupe: 'AB-',
    //                     numberPocket: 4
    //                 },
    //                 {
    //                     bloodGroupe: 'AB+',
    //                     numberPocket: 5
    //                 },
    //             ]
    //         }
    //     }
    // })

    // const bankD = await prisma.bloodBank.upsert({
    //     where: {nameBankBlood: 'bankD'},
    //     update: {},
    //     create: {
    //         nameBankBlood: 'bankD',
    //         adresse: 'Maison D a cote de e',
    //         longitude: 4,
    //         lagitude: 1,
    //         blood: {
    //             create: [
    //                 {
    //                     bloodGroupe: 'O+',
    //                     numberPocket: 50
    //                 },
    //                 {
    //                     bloodGroupe: 'O-',
    //                     numberPocket: 20
    //                 },
    //                 {
    //                     bloodGroupe: 'A+',
    //                     numberPocket: 40
    //                 },
    //                 {
    //                     bloodGroupe: 'A-',
    //                     numberPocket: 25
    //                 },
    //                 {
    //                     bloodGroupe: 'B+',
    //                     numberPocket: 26
    //                 },
    //                 {
    //                     bloodGroupe: 'B-',
    //                     numberPocket: 7
    //                 },
    //                 {
    //                     bloodGroupe: 'AB-',
    //                     numberPocket: 5
    //                 },
    //                 {
    //                     bloodGroupe: 'AB+',
    //                     numberPocket: 8
    //                 },
    //             ]
    //         }
    //     }
    // })

    // const bankE = await prisma.bloodBank.upsert({
    //     where: {nameBankBlood: 'bankE'},
    //     update: {},
    //     create: {
    //         nameBankBlood: 'bankE',
    //         adresse: 'Maison E a cote de f',
    //         longitude: 3,
    //         lagitude: 4,
    //         blood: {
    //             create: [
    //                 {
    //                     bloodGroupe: 'O+',
    //                     numberPocket: 14
    //                 },
    //                 {
    //                     bloodGroupe: 'O-',
    //                     numberPocket: 9
    //                 },
    //                 {
    //                     bloodGroupe: 'A+',
    //                     numberPocket: 30
    //                 },
    //                 {
    //                     bloodGroupe: 'A-',
    //                     numberPocket: 45
    //                 },
    //                 {
    //                     bloodGroupe: 'B+',
    //                     numberPocket: 6
    //                 },
    //                 {
    //                     bloodGroupe: 'B-',
    //                     numberPocket: 10
    //                 },
    //                 {
    //                     bloodGroupe: 'AB-',
    //                     numberPocket: 7
    //                 },
    //                 {
    //                     bloodGroupe: 'AB+',
    //                     numberPocket: 8
    //                 },
    //             ]
    //         }
    //     }
    // })

    // const bankF = await prisma.bloodBank.upsert({
    //     where: {nameBankBlood: 'bankF'},
    //     update: {},
    //     create: {
    //         nameBankBlood: 'bankF',
    //         adresse: 'Maison F a cote de g',
    //         longitude: 15,
    //         lagitude: 20,
    //         blood: {
    //             create: [
    //                 {
    //                     bloodGroupe: 'O+',
    //                     numberPocket: 25
    //                 },
    //                 {
    //                     bloodGroupe: 'O-',
    //                     numberPocket: 20
    //                 },
    //                 {
    //                     bloodGroupe: 'A+',
    //                     numberPocket: 15
    //                 },
    //                 {
    //                     bloodGroupe: 'A-',
    //                     numberPocket: 15
    //                 },
    //                 {
    //                     bloodGroupe: 'B+',
    //                     numberPocket: 30
    //                 },
    //                 {
    //                     bloodGroupe: 'B-',
    //                     numberPocket: 18
    //                 },
    //                 {
    //                     bloodGroupe: 'AB-',
    //                     numberPocket: 23
    //                 },
    //                 {
    //                     bloodGroupe: 'AB+',
    //                     numberPocket: 50
    //                 },
    //             ]
    //         }
    //     }
    // })

    // console.log({ bankA, bankB })

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