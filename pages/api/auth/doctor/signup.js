// import bcrypt from "bcrypt"
// import { prisma } from "../../../../lib/prismadb"
// import { serialize } from "cookie";
// import jwt from 'jsonwebtoken'

// export default async function handler(req, res) {
//     const salt = bcrypt.genSaltSync();

//     if(req.method === 'POST') {

//         if(!req.body) res.status(404).json({ message: "votre formullaire ne contient aucune information" });
//         //recuperer les informations du client 
//         const {firstname, lastname, email, telephone, password, numOrdreNational, hopital} = req.body;

//         let user

//         try {

//                 user = await prisma.doctor.upsert({
//                     where: {  email: email },
//                     update: {},
//                     create: {
//                         firstname: firstname,
//                         lastname: lastname,
//                         email: email,
//                         telephone: telephone,
//                         password: bcrypt.hashSync(password, salt),
//                         numOrdreNational: numOrdreNational,
//                         hopital: hopital
//                     }
//                 }) 

//                 const token = jwt.sign(
//                     {
//                         id: user.id,
//                         email: user.email,
//                     },
//                    'blood',
//                    {expiresIn: '1h'} 
//                 );

//                 res.status(200).json({ user, token });

//         } catch (error) {
//             console.log(error);
//             res.status(404).json({message: "veuiller bien renseigner toutes les informations demandees"})        
//         }

//     } else {
//         res.status(500).json({ message: "La methode de votre requette est invalide .. on accepte que la methode POST" });   
//     }
// }


import bcrypt from "bcrypt";
import { prisma } from "../../../../lib/prismadb";
import { serialize } from "cookie";
import jwt from 'jsonwebtoken';
import randomstring from "randomstring";
import { Client, Verify } from '@vonage/server-sdk';/ Importez la bibliothèque Vonage

export default async function handler(req, res) {
  const salt = bcrypt.genSaltSync();

  if (req.method === "POST") {
    if (!req.body)
      res.status(404).json({ message: "Votre formulaire ne contient aucune information" });
    // Récupérer les informations du client
    const { firstname, lastname, email, telephone, password, numOrdreNational, hopital } = req.body;

    // Générer le code de vérification
    const verificationCode = randomstring.generate(6);

    // Envoyer le code de vérification par SMS
    await sendVerificationCode(telephone, verificationCode);

    let user;

    try {
      user = await prisma.doctor.upsert({
        where: { email: email },
        update: {},
        create: {
          firstname: firstname,
          lastname: lastname,
          email: email,
          telephone: telephone,
          password: bcrypt.hashSync(password, salt),
          numOrdreNational: numOrdreNational,
          hopital: hopital,
          verificationCode: verificationCode,
        },
      });
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        'blood',
        { expiresIn: '1h' }
      );

      res.status(200).json({ user, token });

    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "veuiller bien renseigner toutes les informations demandees" })
    }
  }
}

async function sendVerificationCode(telephone, verificationCode) {
  
  const vonage = new Client({
    apiKey: '419f13f9',
    apiSecret: 'AK4P4tur6yJi3CN9'
  });

  const verify = new Verify(vonage);

  const from = '96173296';
  const to = telephone;
  const text = `Votre code de vérification est : ${verificationCode}`;


  async function sendSMS() {
    await vonage.sms.send({ to, from, text })
      .then(resp => { 
        console.log('Message sent successfully'); 
        console.log(resp); })
      .catch(
        err => { console.log('There was an error sending the messages.'); 
        console.error(err); });
  }

  sendSMS();

}



