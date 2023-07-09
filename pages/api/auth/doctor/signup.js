
// import bcrypt from "bcrypt";
// import { prisma } from "../../../../lib/prismadb";
// import { serialize } from "cookie";
// import jwt from 'jsonwebtoken';
// import nodemailer from 'nodemailer';

// // Create a mail transporter for sending emails
// const emailTransporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false,
//   auth: {
//     user: 'Wadoud Bouraïma', // Replace with your Gmail username
//     pass: 'Adeyemi$180398', // Replace with your Gmail password
//   },
// });

// export default async function handler(req, res) {
//   const salt = bcrypt.genSaltSync();

//   if (req.method === 'POST') {
//     if (!req.body)
//       res.status(404).json({ message: "Votre formulaire ne contient aucune information" });

//     const { firstname, lastname, email, telephone, password, numOrdreNational, hopital } = req.body;
//     const verificationCode = generateVerificationCode();

//     try {
//       await sendEmail(email, "Code de vérification", `Votre code de vérification est : ${verificationCode}`);

//       const user = await prisma.doctor.upsert({
//         where: { email: email },
//         update: {},
//         create: {
//           firstname: firstname,
//           lastname: lastname,
//           email: email,
//           telephone: telephone,
//           password: bcrypt.hashSync(password, salt),
//           numOrdreNational: numOrdreNational,
//           hopital: hopital,
//           verificationCode: verificationCode,
//         },
//       });

//       const token = generateJwtToken(user.id, user.email);

//       res.status(200).json({ user, token });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: "Une erreur est survenue lors du processus d'inscription" });
//     }
//   } else {
//     res.status(405).json({ message: "La méthode de requête n'est pas autorisée" });
//   }
// }

// function generateVerificationCode() {
//   return Math.floor(100000 + Math.random() * 900000);
// }

// async function sendEmail(to, subject, message) {
//   try {
//     const mailOptions = {
//       from: 'your_username@gmail.com', // Replace with your Gmail username
//       to: to,
//       subject: subject,
//       text: message,
//     };

//     await emailTransporter.sendMail(mailOptions);
//     console.log('Email sent successfully');
//   } catch (error) {
//     console.error('Failed to send email:', error);
//     throw new Error('Error sending email');
//   }
// }

// function generateJwtToken(userId, email) {
//   const token = jwt.sign(
//     {
//       id: userId,
//       email: email,
//     },
//     'bank',
//     { expiresIn: '1h' }
//   );
//   return token;
// }


import { prisma } from "../../../../lib/prismadb"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
    const salt = bcrypt.genSaltSync();

    if(req.method === 'POST') {

        if(!req.body) res.status(404).json({ message: "votre formullaire ne contient aucune information" });
        //recuperer les informations du client 
        const { firstname, lastname, email, telephone, password, numOrdreNational, hopital } = req.body;

        let doctor

        try {
                
                doctor = await prisma.doctor.upsert({
                  where: { email: email },
                    update: {},
                        create:{
                            firstname: firstname,
                            lastname: lastname,
                            email: email,
                            telephone: telephone,
                            password: bcrypt.hashSync(password, salt),
                            numOrdreNational: numOrdreNational,
                            hopital: hopital,
                      },
                }) 
                
                const token = jwt.sign(
                    {
                        id: doctor.id,
                        email: doctor.email,
                    },
                   'bank',
                   {expiresIn: '1h'} 
                );

                res.status(200).json({ doctor, token });
            
        } catch (error) {
            console.log(error);
            res.status(404).json({message: "veuiller bien renseigner toutes les informations demandees"})        
        }

    } else {
        res.status(500).json({ message: "La methode de votre requette est invalide .. on accepte que la methode POST" });   
    }
}

