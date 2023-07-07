import bcrypt from "bcrypt";
import { prisma } from "../../../../lib/prismadb";
import { serialize } from "cookie";
import jwt from 'jsonwebtoken';
import { initClient } from 'messagebird';

// Initialize the MessageBird client
const messagebird = initClient('rR3rORufpbMnjQB5vof2QmCh0');

export default async function handler(req, res) {
  const salt = bcrypt.genSaltSync();

  if (req.method === 'POST') {
    if (!req.body)
      res.status(404).json({ message: "Votre formulaire ne contient aucune information" });

    // Récupérer les informations du client
    const { firstname, lastname, email, telephone, password, numOrdreNational, hopital } = req.body;

    // Générer le code de vérification
    const verificationCode = generateVerificationCode();

    try {
      // Envoie du code de vérification par SMS
      sendVerificationCode(telephone, verificationCode);

      // Enregistrer les informations de l'utilisateur avec le code de vérification
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

      // Générer le token JWT pour l'utilisateur
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
  // Generate a random 6-digit verification code
  return Math.floor(100000 + Math.random() * 900000);
}

function sendVerificationCode(telephone, verificationCode) {
  try {
      messagebird.messages.create({
        originator : '96173296',
        recipients : telephone,
        body : `Votre code de vérification est : ${verificationCode}`
     });
     console.log('SMS message sent successfully');
  } catch (error) {
    console.error('Failed to send SMS message', error);
    throw new Error('Error sending verification code');
  }
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
