import { PrismaClient } from "@prisma/client";
import { Buffer } from 'buffer';
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const portfolio = await prisma.portfolio.findMany();
        console.log(portfolio);
        let portfolioimgs;
        for (let i = 0; i < portfolio.length; i++) {
            portfolioimgs[i] = Buffer.from(portfolio[i]['image']).toString('base64');
        }
        res.status(200).json({portfolio: portfolioimgs});
    } else {
        res.status(400).json({portfolio: []});
    }
    
}
