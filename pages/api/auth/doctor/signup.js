
import bcrypt from "bcrypt";
import { prisma } from "../../../../lib/prismadb";
import { serialize } from "cookie";
import jwt from 'jsonwebtoken';
import { initClient } from 'messagebird';

const client = initClient('rR3rORufpbMnjQB5vof2QmCh0');

export default async function handler(req, res) {
  const salt = bcrypt.genSaltSync();

  if (req.method === 'POST') {
    if (!req.body)
      res.status(404).json({ message: "Votre formulaire ne contient aucune information" });

    const { firstname, lastname, email, telephone, password, numOrdreNational, hopital } = req.body;
    const verificationCode = generateVerificationCode();

    try {
      await sendVerificationCode(telephone, verificationCode);

      const user = await prisma.doctor.upsert({
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

      const token = generateJwtToken(user.id, user.email);

      res.status(200).json({ user, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Une erreur est survenue lors du processus d'inscription" });
    }
  } else {
    res.status(405).json({ message: "La méthode de requête n'est pas autorisée" });
  }
}

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

async function sendVerificationCode(telephone, verificationCode) {
  return new Promise((resolve, reject) => {
    client.messages.create(
      {
        originator: '96173296',
        recipients: [telephone],
        body: `Votre code de vérification est : ${verificationCode}`,
      },
      (error, response) => {
        if (error) {
          console.error('Failed to send SMS message', error);
          reject(new Error('Error sending verification code'));
        } else {
          console.log('SMS message sent successfully');
          resolve(response);
        }
      }
    );
  });
}

function generateJwtToken(userId, email) {
  const token = jwt.sign(
    {
      id: userId,
      email: email,
    },
    'YOUR_JWT_SECRET',
    { expiresIn: '1h' }
  );
  return token;
}
