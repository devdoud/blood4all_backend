
import QRCode from 'qrcode';

export default async function handler(req, res){


        if(req.method !== 'POST') {
            res.status(405).json({ error: 'Method not Allowed' });
            return;
        }


        
        try {

            const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(req.body));
            
            res.status(200).json({ qrCodeDataUrl });

        } catch (error) {
            console.error('Error generating QR code: ', error);
            res.status(500).json({ error: 'Generation du QR code echouee' });
        }
       
}