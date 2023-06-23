import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {article, email, text} = req.body;
    const newClient = {
      article: article,
      email: email,
      text: text
    }
    await prisma.clients.create({
      data: {
        ...newClient
      }
    });
    await prisma.$disconnect();
    res.status(200).json({
      message: "Заявка была успешно отправлена на сервер",
      article,
      email,
      text
    })
  } else {
    res.status(400).json({message: "Неподходящий метод!"});
  }
  
}
