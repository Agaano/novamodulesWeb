import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {login, password} = req.body;
    
    const user = await prisma.login.findFirst({
        where: {
            name: login,
        }
    })

    const isExist = user !== null;
    if (isExist === false) {
        await prisma.login.create({
            data: {
                name: login,
                password: password,
            }
        });
        res.status(200).send();
    } else {
        res.status(401).send();
    }
  } else {
    res.status(400).json({message: "Неподходящий метод!"});
  }
}
