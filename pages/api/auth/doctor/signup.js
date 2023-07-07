import bcrypt from "bcrypt";
import { prisma } from "../../../../lib/prismadb";
import { serialize } from "cookie";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

// Créer un transporteur de messagerie pour les e-mails
const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bouraimawadoud@gmail.com', // Remplacez par votre adresse e-mail Gmail
    pass: 'AdeDoud$98', // Remplacez par votre mot de passe Gmail
  },
});

export default async function handler(req, res) {
  const salt = bcrypt.genSaltSync();

  if (req.method === 'POST') {
    if (!req.body)
      res.status(404).json({ message: "Votre formulaire ne contient aucune information" });

    const { firstname, lastname, email, telephone, password, numOrdreNational, hopital } = req.body;
    const verificationCode = generateVerificationCode();

    try {
      await sendEmail(email, "Code de vérification", `Votre code de vérification est : ${verificationCode}`);

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

async function sendEmail(to, subject, message) {
  try {
    const mailOptions = {
      from: 'bouraimawadoud@gmail.com', // Remplacez par votre adresse e-mail Gmail
      to: to,
      subject: subject,
      text: message,
    };

    await emailTransporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Error sending email');
  }
}

function generateJwtToken(userId, email) {
  const token = jwt.sign(
    {
      id: userId,
      email: email,
    },
    'bank',
    { expiresIn: '1h' }
  );
  return token;
}
